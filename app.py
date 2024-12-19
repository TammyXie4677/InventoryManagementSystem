from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import DataRequired, EqualTo, Email
from flask_compress import Compress
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static/browser')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///default.db').replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')

# Extensions
Compress(app)
CORS(app)
db = SQLAlchemy(app)

# User model for PostgreSQL
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# User Registration Form
class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])

# Automatic table creation and data initialization
@app.before_first_request
def create_tables_and_seed_data():
    # Automatically create tables
    db.create_all()

    # Add initial data if necessary
    admin_email = "admin@example.com"
    existing_admin = User.query.filter_by(email=admin_email).first()

    if not existing_admin:
        admin_user = User(
            username="admin",
            email=admin_email,
            password=generate_password_hash("admin123", method="sha256"),
        )
        db.session.add(admin_user)
        db.session.commit()
        print("Admin user created successfully.")
    else:
        print("Admin user already exists.")

# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    form = RegistrationForm(request.form)
    if form.validate_on_submit():
        # Get data from the form
        username = form.username.data
        email = form.email.data
        password = form.password.data
        confirm_password = form.confirm_password.data

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
        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=username, email=email, password=hashed_password)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201
    else:
        return jsonify({"error": form.errors}), 400

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

    return jsonify({"message": "Login successful!", "username": user.username}), 200

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

