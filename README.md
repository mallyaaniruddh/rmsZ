# Research Management System (RMS) - Frontend

The **Research Management System (RMS) Frontend** is built using **React + Vite** to provide a fast, responsive, and modular user interface. It serves as the **UI Adapter** in the **Hexagonal Architecture**, allowing users to interact with the system while ensuring seamless API communication with the backend.

---

## Features

- **User Authentication**
  - Supports login/logout functionality.
  - Uses **JWT-based authentication** (currently local storage, future backend integration).
  - **Role-Based Access Control (RBAC)** for different user roles.

- **Research Project Management**
  - View and manage research projects.
  - Document collaboration and version control.
  - **Planned:** Real-time updates & API integration.

- **Dashboard & Navigation**
  - Displays key research data.
  - React Router-based navigation.
  - **Dynamic UI based on user roles.**

- **API Handling & Data Fetching**
  - Uses **Axios** for API communication.
  - Centralized API service (`apiService.ts`).
  - **Planned:** Secure API calls with JWT headers.

- **UI/UX Enhancements**
  - Fully **responsive design** (desktop & mobile).
  - **Future Plans:** Dark mode & better error handling.

---

## Tech Stack

| Tech       | Purpose |
|------------|---------|
| **React**  | Component-based UI framework |
| **Vite**   | Fast build tool for development & production |
| **React Router** | Handles navigation and routing |
| **Axios**  | API request handling |
| **JWT** | Authentication mechanism |

---

## Project Structure

