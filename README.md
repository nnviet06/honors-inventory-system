# 📦 Honors Inventory System

A full-stack equipment inventory management system. This application allows staff to track, manage, and transfer IT equipment across different locations within the Honors building. 

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

### Frontend: React + Vite + TypeScript + CSS Modules

### Backend: Node.js + Express + TypeScript + better-sqlite3

### Database: SQLite

## Features

### Completed Features
- ✅ **View Equipment** - Display all equipment in a table
- ✅ **Add Equipment** - Modal form to add new items
- ✅ **Edit Equipment** - Edit model, type, and location of equipment
- ✅ **Delete Equipment** - Remove items from inventory
- ✅ **Search Button** - Search equipment by model name
- ✅ **Filter Button** - Filter by type and building location  
- ✅ **"By Items" View** - Traditional table view of all equipment
- ✅ **"By Location" View** - Floor-by-floor navigation with collapsible sections
- ✅ **Routing** - React Router navigation between By Items and By Location views
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Auto-refresh** - Table updates after add/edit/delete
- ✅ **USF Theme** 

## Recent Updates (SQLite Version)

This version includes additional features implemented after the initial submission:

- ✅ **Routing** - React Router navigation between views
- ✅ **Edit Equipment Details** - Edit model and type (previously only location)
- ✅ **Search Functionality** - Real-time search by equipment model name
- ✅ **Filter Dropdown** - Filter by equipment type and building location
- ✅ **By Location View** - Complete floor-by-floor navigation

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
Using database: inventory.db
Initialized sample (inventory.db)
Server running on http://localhost:5000
```
**Key indicators:**
- "Server running on http://localhost:5000"
- "Initialized sample" (first time only)
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



## Database Setup

The database is **automatically initialized** when you first run the backend!

## Future Work

All frontend planned features have been implemented. For scalability, backend needs more attention:

- Migrate from SQLite to PostgreSQL for production
- Add pagination for large datasets
- Implement caching to reduce API calls
- Add authentication and user roles


## Acknowledgments

- CSS and database are AI powered to save time.

> **Note:** All previously planned features have been implemented in this version.