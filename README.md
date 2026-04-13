<h1>AI Attendance System</h1>

<h2>📌 Live Demo & Repository</h2>
<ul>
  <li><strong>GitHub Repository:</strong> <a href="https://github.com/taksimsquare12/face-attendance-react" target="_blank">View Repo</a></li>
  <li><strong>Live Hosting URL (Firebase):</strong> <a href="https://face-attendance-react.web.app" target="_blank">View Live Project</a></li>
</ul>

<h2>📖 Project Overview</h2>
<p>
This project is a Single Page Application (SPA) built with React, Tailwind CSS, and React Router DOM. 
It integrates Firebase services (Firestore, Authentication, Hosting) and Cloudinary for image storage.
</p>

<h2>✨ Key Features</h2>
<ul>
  <li>Responsive UI with Tailwind CSS</li>
  <li>SPA Routing using React Router DOM</li>
  <li>User Authentication (Email/Password)</li>
  <li>Firestore Database integration</li>
  <li>Cloudinary for image uploads</li>
  <li>Firebase Hosting deployment</li>
</ul>

<h2>🛠 Technologies Used</h2>
<ul>
  <li>React + Vite</li>
  <li>Tailwind CSS</li>
  <li>React Router DOM</li>
  <li>Firebase (Firestore, Auth, Hosting)</li>
  <li>Cloudinary (Image Storage)</li>
  <li>GitHub (Version Control)</li>
</ul>

<h2>📂 Project Structure</h2>
<pre>
/index.html
/vite.config.js
/tailwind.config.js
/README.md
/package.json
/package-lock.json
/postcss.config.js
/firebase.json
/.gitignore
/.firebaserc
/eslint.config.js
/public
/node_modules
/dist
/.firebase
/src
  ├── main.jsx
  ├── App.jsx
  ├── App.css
  ├── cloudinary.js
  ├── firebase.js
  ├── index.css
  ├── /components
  │   ├── /layouts
  │   │   └── Navbar.jsx
  ├── /pages
  │   ├── HomePage.jsx
  │   ├── About.jsx
  │   ├── Contact.jsx
  │   ├── BlogPage.jsx
  │   ├── RecordsPage.jsx
  │   ├── SigninPage.jsx
  │   ├── SignupPAge.jsx
  │   ├── PageNotFound.jsx
  └── /services
  │   ├── student.js
  │   ├── record.js
  └── constant
  │   ├── themeConstants.js
</pre>

<h2>⚙️ How to Run the Project</h2>
<ol>
  <li>Clone the repository: <code>git clone &lt;repo-url&gt;</code></li>
  <li>Navigate to project folder: <code>cd face-attendance-react</code></li>
  <li>Install dependencies: <code>npm install</code></li>
  <li>Run development server: <code>npm run dev</code></li>
  <li>Build project: <code>npm run build</code></li>
  <li>Deploy to Firebase Hosting: <code>firebase deploy</code></li>
</ol>
