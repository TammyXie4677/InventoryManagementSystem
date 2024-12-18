export default `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Inventory Management System</title>
  <base href="./">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }

    footer {
      background-color: #343a40;
      color: white;
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
      font-size: 1rem;
    }

    main {
      min-height: 80vh;
      /* Ensure space for header and footer */
      background-color: #f8f9fa;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #343a40;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo {
      height: 70px;
    }

    nav ul {
      display: flex;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    nav ul li {
      margin-left: 20px;
    }

    nav ul li a {
      text-decoration: none;
      color: white;
      font-size: 18px;
      padding: 5px 10px;
      transition: color 0.3s;
    }

    nav ul li a:hover {
      color: #007bff;
      /* Color on hover */
    }
  </style>
<link rel="stylesheet" href="styles-H4EXOXPV.css"></head>

<body><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script>
  <header>
    <div class="logo-container">
      <a href="/">
        <img src="/images/logo.jpg" alt="Logo" class="logo">
      </a>      
    </div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/orders">Orders</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main Content Section -->
  <main class="main">
    <app-root></app-root>
  </main>

  <!-- Footer Section -->
  <footer>
    <p>&copy; 2024 Inventory Management System. All rights reserved.</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="polyfills-FFHMD2TL.js" type="module"></script><script src="main-VFOVLJCV.js" type="module"></script></body>

</html>
`;