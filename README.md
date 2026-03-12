# 📦 Honors Inventory System

> **Note:** For the original submission, see the [`sqlite-original`](https://github.com/nnviet06/Honors-Inventory-System/tree/sqlite-original) branch.  

> This `main` branch rebuilds the backend using PostgreSQL for scalability.

A full-stack equipment inventory management system. This application allows staff to track, manage, and transfer IT equipment across different locations within the Honors building. 

## Live Demo
https://honors-inventory-system.vercel.app/

## Project Overview

This inventory system enables the Honors IT Team to:
- **TRACK** (monitors, laptops, printers, keyboards, mice)
- **MANAGE LOCATIONS** across 5 floors (Warehouses, Classrooms, Offices)
- **ADD NEW** to inventory
- **DELETE** broken equipment
---
## Demo Screenshots

### Items View
![Items View](./projectdemo/byitemsview.jpg)

### Location View
![Location View](./projectdemo/bylocationview.jpg)

### Search Function
![Search Function](./projectdemo/searchfunction.jpg)

### Filter Function
![Filter Function](./projectdemo/filterfunction.jpg)

### Add New Equipment
![Add New Function](./projectdemo/addnewfunction.jpg)

### Edit Equipment
![Edit Function](./projectdemo/editfunction.jpg)

---

## Technology Stack

### Frontend: React + Vite + TypeScript + CSS Modules (deployed on Vercel)

### Backend: Node.js + Express + TypeScript (deployed on Render)

### Database: PostgreSQL (hosted on Supabase)

## Features

- **View Equipment** - Display all equipment in a table
- **Add Equipment** - Modal form to add new items
- **Edit Equipment** - Edit model, type, and location of equipment
- **Delete Equipment** - Remove items from inventory
- **Search Button** - Search equipment by model name
- **Filter Button** - Filter by type and building location  
- **"By Items" View** - Traditional table view of all equipment
- **"By Location" View** - Floor-by-floor navigation with collapsible sections
- **Routing** - React Router navigation between By Items and By Location views
- **Loading States** - Visual feedback during API calls
- **Error Handling** - User-friendly error messages
- **Auto-refresh** - Table updates after add/edit/delete
- **USF Theme** 

## Feature Highlights

### ✏️ Edit Equipment
- Edit all equipment details: Model, Type, and Location
- Dropdown selection for Type and Location
- Validation: requires at least one field to change
- Real-time update after save

### 🔍 Search
- Search equipment by model name
- Click Search button to filter results
- Works combined with Filter

### 🎛️ Filter
- Dropdown with two options: Type and Location
- Types: Monitor, Laptop, Printer, Keyboard, Mouse
- Locations: Warehouse, Classroom, Office
- Real-time data sync with refreshKey

### 📍 Separate Table Views
- **By Items**: Traditional table view of all equipment
- **By Location**: Floor-by-floor navigation (Floor 1-5)
  - Collapsible sections by building type
  - Edit and Delete actions per location
  - Visual equipment count per location
- **Data Sync**: Changes in one view reflect in the other (shared database)

### 🧭 Routing
- React Router for navigation between views
- `/items` - By Items view (default)
- `/locations` - By Location view
- NavBar buttons for easy switching

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nnviet06/Honors-Inventory-System.git
cd Honors-Inventory-System
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Setup Environment Variables

Create a `.env` file in the `backend/` directory:
```
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_URL=your_project_url_here
PORT=5000
```

Get your credentials from [Supabase](https://supabase.com) → Project Settings → API

### 5. Setup Database

1. In Supabase dashboard, go to **SQL Editor**
2. Run the contents of `database/schema.sql`
3. Run the contents of `database/sample.sql`
---

## How to Run

You need **TWO separate terminal windows** running simultaneously.

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

### Terminal 2: Start Frontend Server

```bash
cd frontend
npm run dev
```
## Verification - How to Know It's Working

### After `npm install` (Backend):
**Expected output:**
- "added X packages, and audited X packages"
- "found 0 vulnerabilities" (or minimal low-severity warnings)
- No error messages in red

### After `npm run dev` (Backend):
**Expected output:**
```
[nodemon] starting `ts-node src/server.ts`
[dotenv@17.3.1] injecting env (4) from .env
Server running on http://localhost:5000
```
**Key indicators:**
- "injecting env (4) from .env"
- "Server running on http://localhost:5000"
- No error messages

### After `npm install` (Frontend):
**Expected output:**
- "added X packages, and audited X packages"
- "found 0 vulnerabilities" 
- No error messages in red

### After `npm run dev` (Frontend):
**Expected output:**
```
VITE v7.x.x ready in XXXms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```
**Key indicators:**
- "ready in XXXms"
- Local URL displayed
- No error messages

### In Browser (http://localhost:5173):
**You should see:**
- Equipment table with 20 sample items
- No "Failed to fetch" errors in console (F12)

**If everything above checks out → Your system is ready**

## Acknowledgments

- CSS and database are AI powered to save time.
