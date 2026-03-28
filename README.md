# Is It Clear ?

## Overview
**Is It Clear ?** is a full-stack collaborative doubt-solving platform designed to improve interaction between students and teachers. It enables structured doubt posting, multi-teacher responses, and organized class-based learning.

Unlike traditional systems where students rely on a single explanation, this platform allows multiple teachers to contribute answers, providing broader perspectives and deeper understanding.

The platform is deployed and production-ready, built with a scalable architecture and modern technologies.

---

## Live Demo
The application is deployed on Vercel and accessible here: 
https://isitclear.vercel.app/

---

## Problem Statement
In most academic environments:
- Students hesitate to ask doubts
- Doubts get lost in chats or unstructured platforms
- A single explanation is often insufficient
- Teachers lack insights into student confusion patterns

**Is It Clear** solves this by creating a centralized and structured doubt-solving ecosystem.

---

## Features

### Student Features
- Post doubts within specific classes
- View answers from multiple teachers
- Bookmark doubts for revision
- Organized dashboard
- Clean and focused UI

### Teacher Features [Coming Soon]
- Access multiple classes
- View and respond to doubts
- Assign doubts when needed
- Provide structured explanations

### Platform Features
- Multi-teacher response system
- Role-based access (Student / Teacher)
- Class-based organization
- Production deployment (Vercel)
- Scalable backend design

---

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### Database & ORM
- PostgreSQL
- Prisma ORM

### Authentication
- Better-Auth
- OAuth (Google [Coming Soon], GitHub)

### Deployment
- Vercel

---

## Architecture Highlights

- Full-stack Next.js application
- Server-side rendering and API routes
- Prisma ORM for type-safe database queries
- Secure authentication with OAuth
- Modular and scalable code structure

---

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Steps

1. Clone the repository
```
git clone https://github.com/RayBreeze/isitclear.git
cd is-it-clear
```

2. Install dependencies
```
npm install
```

3. Setup environment variables

Create a `.env` file:
```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret

GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
```

4. Setup Prisma
```
npx prisma generate
npx prisma migrate dev
```

5. Run the development server
```
npm run dev
```

---

## Future Scope

- Teacher analytics dashboard (learning patterns, difficulty tracking)
- Machine learning-based insight system
- Real-time doubt discussions
- Notifications system
- Performance optimization and scaling

---

## Use Cases

- Colleges and universities
- Coaching institutes
- Online learning platforms
- Peer learning communities

---

## Contributing

Contributing Guidelines are coming soon...

---

## License
This project is licensed under the AGPL-3.0

---

This project is designed to evolve into a large-scale academic platform with intelligent insights, structured collaboration, and modern cloud-based infrastructure.
