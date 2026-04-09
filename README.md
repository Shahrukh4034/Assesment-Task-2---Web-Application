Login  Creadentials  for the  Login from Frontend 

**User : admin
Password : Password123**



**📋 EduManager - Student Management System**
EduManager is a full-stack enterprise dashboard designed for educational institutions to manage student records, course enrollments, and administrative settings. It features a modern Angular frontend and a secure .NET backend.
________________________________________
🚀 Key Features
•	Secure Authentication: JWT-based login system with BCrypt password hashing.
•	Student Directory: Full CRUD (Create, Read, Update, Delete) operations for student management.
•	Search & Pagination: Optimized data handling for large student lists.
•	Responsive Dashboard: A professional sidebar-based layout with real-time tab switching.
•	Account Settings: Managed profile updates and system preferences.
________________________________________
🛠 Tech Stack
Frontend:
•	Angular 17+
•	RxJS (State management via BehaviorSubjects)
•	SCSS (Custom professional styling)
•	Bootstrap Icons
Backend:
•	.NET Core Web API
•	MSSQL (Database)
•	JWT (JSON Web Tokens) for Security
________________________________________
⚙ Setup & Installation
Prerequisites
•	Node.js (v18+)
•	.NET SDK (v8.0+)
•	SQL Server
1. Backend Setup
1.	Navigate to the API folder:
Bash
cd EduManager.API
2.	Update the connection string in appsettings.json to point to your local SQL Server.
3.	Apply migrations and start the server:
Bash
dotnet ef database update
dotnet run
2. Frontend Setup
1.	Navigate to the Client folder:
Bash
cd EduManager.Client
2.	Install dependencies:
Bash
npm install
3.	Start the Angular development server:
Bash
ng serve
4.	Open http://localhost:4200 in your browser.
________________________________________
🔐 Default Credentials
Use the following credentials to access the Administrator dashboard:
Role	        Username	        Password
Administrator 	admin	          Password123
________________________________________

📖 API Endpoints Summary
Method	Endpoint	Description
POST	/api/auth/login	Authenticate user & return JWT
GET	/api/students	Get all students (paginated)
POST	/api/students	Register a new student
PUT	/api/students/{id}	Update existing student record
DELETE	/api/students/{id}	Remove student from system
________________________________________

 Author
Shahrukh Sanadi Full Stack Developer | Data Analyst LinkedIn Profile


