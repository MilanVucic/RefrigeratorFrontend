# Fridge Frontend

This is a Vue 3 SPA frontend for the Fridge Management system. It connects to the Django REST API backend to manage fridges and items. JWT authentication is used for secure access.

---

## **Prerequisites**

- Installed Node.js `v18+` and npm
- Django API running at `http://127.0.0.1:8000/`

---

## **Project Setup**

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Run development server:
```bash
   npm run dev
```
4. Open http://localhost:5173/

### Possible improvements

- Currently, the authentication token is stored in localStorage, which is convenient but not secure.
localStorage is fully accessible to JavaScript.
If the app ever experiences an XSS vulnerability, malicious scripts can read the token.
Safer approaches were considered, but due to time constraints, this option was chosen.

- Error handling in the current project is minimal and could be improved by providing user-friendly feedback, centralized error logging, and consistent API response handling.