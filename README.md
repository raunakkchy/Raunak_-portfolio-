# Raunak Kumar – Personal Portfolio + Admin CMS

A high-performance, dark futuristic Glassmorphism portfolio and custom Admin CMS/Panel built with **React 19, TypeScript, Tailwind CSS v4, Express, and Vite**.

---

## 🌟 Features

### Public Portfolio
- **Futuristic Glassmorphism Aesthetic**: Dark canvas (`#050607`), liquid glass cards, specular highlights, and active water-droplet shapes.
- **Dynamic Content Fetching**: Automatically displays projects, skills, education, experience, certifications, and profile details managed via the Admin CMS.
- **Project Case Studies**: Comprehensive modal detail views for projects (*Placement OS*, *Simple Hisaab*, *NSIT AI Chatbot*).
- **Cmd + K Navigation Palette**: Quick search and keyboard shortcut modal.
- **Print / PDF Resume Download**: Dynamic resume viewing and download functionality.

### Admin CMS Panel (`/admin` or `/#admin`)
- **Protected Admin Authentication**: Token-based secure login with session persistence.
- **Dashboard Overview**: Metrics tracking total projects, published skills, certifications, experience entries, and quick actions.
- **Projects Management (CRUD)**: Create, edit, delete, publish/unpublish, and add tech stack tags or demo links.
- **Skills Management (CRUD)**: Categorize, tag, add, edit, and delete technical skills.
- **Experience & Internships CMS**: Manage internships (e.g. *NIELIT Patna*) and work history.
- **Academic Education CMS**: Update degrees, institutions, CGPA, and semester status.
- **Verified Certifications CMS**: Add, edit, and manage training certificates (*IIT Bombay Spoken Tutorial*, *Cisco Networking Academy*).
- **Achievements CMS**: Manage factual milestones.
- **Profile & About Section CMS**: Edit bio, headlines, personal statements, and photo URL.
- **Social & Contact Links CMS**: Centralized management for GitHub, LinkedIn, Email, X, and Instagram links.
- **Resume File Management**: Upload and replace resume files or external links.

---

## 🚀 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your admin credentials in `.env`:
```env
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_AUTH_SECRET="your_secret_jwt_key_here"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin CMS Setup

1. Navigate to `http://localhost:3000/#admin` or click the **Shield Icon** in the top navigation bar.
2. Log in using your configured credentials:
   - **Username**: `admin`
   - **Password**: `admin123` (or as set in `.env`)
3. Access the dashboard and start managing your portfolio content in real time!

---

## 📦 Production Deployment

### Build Command
```bash
npm run build
```

### Start Server Command
```bash
npm run start
```
