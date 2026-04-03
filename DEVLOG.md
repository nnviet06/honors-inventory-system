# 📝 Development Log

A chronological record of the development phases for the Honors Inventory System.

---

## Phase 1a: SQLite Version — Initial Submission (Nov–Dec 2025)

**Goal:** Build a working full-stack inventory system for the Honors IT Team coding challenge.

**Results:**
- Frontend: React + TypeScript + Vite + CSS Modules
- Backend: Node.js + Express + TypeScript + better-sqlite3
- Database: SQLite with `schema.sql` and `sample.sql` (auto-initializes on first run)
- Features: Add New equipment, Delete equipment, Edit equipment (location only)

**Key decisions:**
- Chose SQLite for zero-setup friction — testers can clone and run without external dependencies, database is automatically initialized
- Used `better-sqlite3` for synchronous database access
---

## Phase 1b: SQLite Version — Final Submission (Feb 2026)

**Goal:** Improve the submission based on review feedback from the Honors IT Team.

**Results**
- Added React Router with By Items (`/items`) and By Location (`/locations`) views
- Expanded Edit to include model and type (previously only location)
- Implemented Search and Filter function
- Restyled entire webapp

**Submitted:** Feb 11, 2026 on the [`sqlite-original`](https://github.com/nnviet06/Honors-Inventory-System/tree/sqlite-original) branch.

**Related PRs:** [#2](https://github.com/nnviet06/Honors-Inventory-System/pull/2), [#3](https://github.com/nnviet06/Honors-Inventory-System/pull/3), [#4](https://github.com/nnviet06/Honors-Inventory-System/pull/4)

---

## Phase 2: PostgreSQL Migration + Deployment (Dec 2025–Mar 2026)

**Goal:** Rebuild the backend with PostgreSQL for scalability, and deploy the full stack.

**What changed:**
- Converted SQL syntax from SQLite to PostgreSQL
- Rewrote all controller functions from synchronous `better-sqlite3` calls to async Supabase query builder (`supabase.from().select()`)
- Hosted database on [Supabase](https://supabase.com)
- Deployed frontend on [Vercel](https://vercel.com), backend on [Render](https://render.com)

**Related PRs:** [#5](https://github.com/nnviet06/Honors-Inventory-System/pull/5), [#6](https://github.com/nnviet06/Honors-Inventory-System/pull/6)

---

## Phase 3a: Per-User Data Isolation (Mar 2026) — [Issue #7](https://github.com/nnviet06/Honors-Inventory-System/issues/7)

**Problem:** After deployment, all users shared the same equipment data. Adding or deleting items affected everyone.

**Temp fix:** Database reset on frontend load — every time the app loaded, it wiped equipment data back to the 20 sample items. Quick but fragile. ([PR #8](https://github.com/nnviet06/Honors-Inventory-System/pull/8))

**Permanent fix:** Full authentication system.
- Added Auth UI and Supabase Auth routed through Express backend
- JWT token management with auth middleware protecting all equipment routes
- Created `seed_user_equipment()` Supabase function that auto-seeds 20 sample items on signup
- Refactored all fetch calls into `equipmentService.ts` (removed direct `fetch()` from components)

**Related PRs:** [#8](https://github.com/nnviet06/Honors-Inventory-System/pull/8), [#9](https://github.com/nnviet06/Honors-Inventory-System/pull/9)

---

## Phase 3b: Per-User Sequential IDs (Mar 2026) — [Issue #10](https://github.com/nnviet06/Honors-Inventory-System/issues/10)

**Problem:** PostgreSQL's `SERIAL` primary key is a global auto-increment. When User A has items 1–20 and User B signs up, User B's seeded items start at ID 21–40 instead of 1–20.

**Solution:** Added a `user_seq` column as a per-user display ID.
- `user_seq` is what the frontend shows in the "ID" column while internal `id` (SERIAL) is still used for all API calls
- Created `user_seq_counters` table to track the next sequence number per user — prevents ID reuse after deletion (counter only increments, never resets)
- Updated `seed_user_equipment()` to assign `user_seq` 1–20 and initialize counter at 20

**Related PRs:** [#11](https://github.com/nnviet06/Honors-Inventory-System/pull/11), [#12](https://github.com/nnviet06/Honors-Inventory-System/pull/12)

---

## Phase 4: Bulk Delete + Refactor (Mar 2026) [Issue #13](https://github.com/nnviet06/Honors-Inventory-System/issues/13)

**Bulk Delete feature:**
- Added checkboxes to each row + Select All checkbox in table header + "Delete Selected" button with confirmation dialog
- Backend endpoint: `DELETE /api/equipment/bulk` with `.in('id', ids)` query

**Code refactor:**
- Extracted `useEquipmentActions` hook — shared edit, delete, and modal handlers used by both `EquipTable` and `LocationTable`
- Extracted `useEquipTable` hook — all state, fetching, filtering, and bulk delete logic from `EquipTable`
- Refactored `LocationTable` to loop building sections instead of hardcoding each one
- Re-structured backend files, centralized shared type definitions

**Related PRs:** [#14](https://github.com/nnviet06/Honors-Inventory-System/pull/14)

---

## Phase 5a: Guest Mode (Mar-Apr 2026) - [Issue #17](https://github.com/nnviet06/Honors-Inventory-System/issues/17)

**Problem:** Visitors couldn't try the app without creating an account.

**Solution:** Added a Guest Mode entry point on the landing page.
- Created `LandingPage` container component that wraps `AuthPage` form + "Try Guest Mode" button with divider
- Backend `POST /api/auth/guest` creates a temporary account (`guest_<timestamp>@example.com`) with auto-generated password, then signs in and returns JWT
- Added `authService.guestMode()` on frontend to call the guest endpoint
- Guest accounts auto-seeded with 20 sample items via existing `seed_user_equipment()` function

**Related PRs:** [#18](https://github.com/nnviet06/Honors-Inventory-System/pull/18)