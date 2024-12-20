from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import DataRequired, EqualTo, Email
from flask_compress import Compress
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

app = Flask(__name__, static_folder='static/browser')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///default.db').replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')  # 用于生成 JWT 的密钥

# Extensions
Compress(app)
CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User model for PostgreSQL
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Product model for PostgreSQL
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    quantity = db.Column(db.Integer, default=0, server_default='0')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Establish relationship with the User table
    user = db.relationship('User', backref=db.backref('products', lazy=True, cascade="all, delete-orphan"))

# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() 
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Ensure all fields are filled
    if not username or not email or not password or not confirm_password:
        return jsonify({"error": "All fields are required"}), 400

    # Compare password and confirm_password
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    # Create new user
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, password=hashed_password)

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    form_data = request.get_json()
    email = form_data.get('email')
    password = form_data.get('password')

    # Validate input data
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not found"}), 404

    # Verify password
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid password"}), 401

    # Generate JWT
    access_token = create_access_token(identity={"email": user.email, "username": user.username})

    return jsonify({"message": "Login successful!", "access_token": access_token}), 200

@app.route('/api/products', methods=['GET'])
def get_all_products():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    products = Product.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'price': float(p.price),
        'quantity': p.quantity
    } for p in products]), 200


# Protected route example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()  
    return jsonify({"message": "Access granted!", "user": current_user}), 200

# Serve the Angular application (index.html)
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files (JS, CSS, images)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # If the requested path exists as a file, serve it
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve the index.html for Angular routing
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
