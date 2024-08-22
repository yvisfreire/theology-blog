# Teologia com Limonada - Fullstack Theology Blog
This is a fullstack blog application built with Next.js and Tailwind CSS on the frontend, and Node.js with PostgreSQL on the backend.

## Live Demo
Check out the live application [here](https://teolima.vercel.app/).

## Features
- Dynamic blog posts
- User authentication (authors)
- Responsive design
- SEO Friendly

## To do
- [x] Author pages
- [ ] Comments system
- [ ] Tags system
- [ ] Search system
- [ ] Email subscription system
- [ ] Better SEO
- [ ] Dark mode


## Installation
1. Clone the repository:
```bash
git clone https://github.com/yvisfreire/theology-blog.git
cd theology-blog
```

2. Install dependencies for the client and server:
```bash
npm install
cd client
npm install
cd ..
cd server
npm install
```

3. Set up the PostgreSQL database.
```bash
npx prisma migrate dev
```

4. Set up environment Variables
- client/.env
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
- server/.env
```env
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=your_jwt_secret
```

## Running the Application
1. Start the PostgreSQL server.
```bash
sudo service postgresql start
```
2. Run the backend server:
```bash
cd server
npm run dev
```
3. Run the frontend:
```bash
cd client
npm run dev
```
4. Open http://localhost:3000 to view the application in your browser.

## Technologies Used
- **Frontend**:
  - Next.js - React framework for server-side rendering and static site generation
  - Tailwind CSS - Utility-first CSS framework
- **Backend**:
  - Node.js - JavaScript runtime
  - Express.js - Web framework for Node.js
  - PostgreSQL - Relational database management system
  - Prisma - ORM for PostgreSQL
  - JWT - JSON Web Tokens for authentication

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.