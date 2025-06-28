# NoteVader-Docker 

<p align="center">
  <img src="https://github.com/Jyotiraditya077/NoteVader/blob/main/frontend/public/logo.png" alt="NoteVader Logo" width="100px">
</p>

**NoteVader-Docker** is a Dockerized, full-stack note-taking web app inspired by *Star Wars*. Users can securely write, view, and delete notes with theme switching (Yoda & Darth). Built using the MERN stack and containerized for seamless deployment.

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=00FF9D&center=true&vCenter=true&width=780&lines=May+the+Force+be+with+you.;May+the+Code+be+with+you." alt="Typing SVG Yoda" />
</p>


---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Docker Setup](#-docker-setup)
- [Tech Stack](#tech-stack)
- [Contact](#contact)

---

## Features

✔️ Create, view, and delete notes easily  
✔️ Secure login & registration (JWT-based)  
✔️ Mobile-friendly responsive layout  
✔️ Toggle between **Yoda** and **Darth** themes  
✔️ Smooth transitions and interactive design via DaisyUI  
✔️ Clean and cosmic-themed user interface  

---

## Demo

🔗 **Live App**: [NoteVader-Docker](https://notevader-docker.onrender.com)

---

## Docker Setup

```bash

git clone https://github.com/Jyotiraditya077/NoteVader-Docker.git  
cd NoteVader-Docker  
docker-compose up --build  

## Local URLs (After Docker Compose)  

- **Frontend** → [http://localhost:5173](http://localhost:5173)  
- **Backend** → [http://localhost:5001](http://localhost:5001)  

## Manual Run (Individual Containers)  

# Backend  
cd backend  
docker build -t notevader-backend .  
docker run -d -p 5001:5001 notevader-backend  

# Frontend  
cd frontend  
docker build -t notevader-frontend .  
docker run -d -p 5173:80 notevader-frontend  

```

## Tech Stack

**Frontend:**  
- React (Vite)  
- Tailwind CSS + DaisyUI  
- Lucide Icons  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (with Mongoose)  
- JWT for authentication  

**DevOps**  
- Docker (Compose)  
- Render (for live app hosting)  

---

## Contact

👤 **Jyotiraditya Swain**  
📍 **GitHub**: [Jyotiraditya077](https://github.com/Jyotiraditya077)  
📧 **Email**: jyotiradityaswain123@gmail.com  
🌐 **Portfolio**: [Know more](https://jyotiradityaportfolio.netlify.app/)
