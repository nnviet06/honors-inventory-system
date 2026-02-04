# 📦 Honors Inventory System

A full-stack equipment inventory management system. This application allows staff to track, manage, and transfer IT equipment across different locations within the Honors building. 

## Project Overview

This inventory system enables the Honors IT Team to:
- **TRACK** (monitors, laptops, printers, keyboards, mice)
- **MANAGE LOCATIONS** across 5 floors (Warehouses, Classrooms, Offices)
- **ADD NEW** to inventory
- **DELETE** broken equipment
---

## Technology Stack

### Frontend: React + Vite + TypeScript + CSS Modules

### Backend: Node.js + Express + TypeScript + better-sqlite3

### Database: SQLite

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

## Features

### Completed Features
- ✅ **View Equipment** - Display all equipment in a table
- ✅ **Add Equipment** - Modal form to add new items
- ✅ **Edit Location** - Transfer equipment between locations
- ✅ **Delete Equipment** - Remove items from inventory
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Auto-refresh** - Table updates after add/edit/delete
- ✅ **USF Theme** 

### Future Work (UI Present, Logic Not Implemented)
- 🔄 **Search Button** - SearchBar component exists but search logic not implemented
- 🔄 **Filter Button** - Filter dropdown UI exists but filtering logic not implemented
- 🔄 **"By Location" View** - Navigation button exists but view not implemented

## Acknowledgments

- CSS and database are AI powered to save time.

> **Note:** The current project only fulfills the requirements of the coding challenge. For scalability, I have added a View By Location button, a Search Bar, and Filter button for future development. These functions have not yet been implemented.



