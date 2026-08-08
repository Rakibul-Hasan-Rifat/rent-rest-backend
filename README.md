# RentNest 🏠 — Project Description Document

**"Find & List Rental Properties with Ease"**

A backend API for a rental property marketplace connecting **Tenants** who search for rentals, **Landlords** who list properties, and **Admins** who oversee the platform.

---

## 1. Project Overview

RentNest is a role-based rental property marketplace API. It supports three core workflows:

- **Tenants** browse property listings, submit rental requests, pay for approved rentals, and leave reviews.
- **Landlords** list and manage their properties, and approve/reject incoming rental requests.
- **Admins** moderate users, listings, and requests across the platform.

The system is built around five key domains: **Authentication**, **Property Listings**, **Rental Requests**, **Payments**, and **Reviews**.

---

## 2. Roles & Permissions

Users select a role (`tenant` or `landlord`) at registration. `admin` is a privileged role, typically seeded/assigned manually rather than self-registered.

| Role | Description | Key Permissions |
|---|---|---|
| **Tenant** | End user searching for a place to rent | Browse/search listings · Submit rental requests · Make payments (Stripe/SSLCommerz) · View own payment history · Track own request status (pending/approved/rejected) · Leave reviews after a completed rental · Manage own profile |
| **Landlord** | Property owner listing rentals | Create/edit/delete own property listings · Set property availability (available/unavailable) · Approve or reject rental requests on own properties · View tenant rental history & reviews on own properties |
| **Admin** | Platform moderator | View/manage all users (ban/unban) · View all listings and rental requests platform-wide · Manage property categories · No self-registration — elevated access only |

### Permission Boundaries
- A **Tenant** cannot access landlord-only routes (`/api/landlord/*`) or admin routes (`/api/admin/*`).
- A **Landlord** can only manage properties/requests they own — not another landlord's listings.
- An **Admin** has read/moderation access across all users, listings, and requests, but does not create property listings themselves.

---

## 3. Authentication & Authorization

### Mechanism
- **JWT (JSON Web Token)**-based authentication.
- On successful login/registration, the server issues a JWT containing at minimum the user's `id`, `email` and `role`.
- Protected routes require a valid JWT (commonly via `req.cookies`).
- **Role-based access control (RBAC)** middleware guards role-specific route groups (`/api/v1/landlord/*`, `/api/v1/admin/*`).

### Auth Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user as `tenant` or `landlord`; role chosen at signup |
| POST | `/api/auth/login` | Public | Authenticate user credentials, return a JWT |
| GET | `/api/auth/me` | Authenticated | Return the currently logged-in user's profile from the token |

### Suggested Auth Flow
1. User submits registration data (name, email, password, role, phone, etc.).
2. Password is hashed (e.g., bcrypt) before storage.
3. On login, credentials are verified and a signed JWT is returned.
4. Client attaches the JWT to subsequent requests.
5. Middleware decodes/verifies the token, attaches `req.user`, and checks role permissions before allowing access to protected routes.

---

## 5. API Endpoints

### 5.1 Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Public | Register new user (tenant/landlord) |
| POST | `/api/v1/auth/login` | Public | Login user, return JWT |
| post | `/api/v1/auth/logout` | Authenticated | Get current authenticated user |
| post | `/api/v1/auth/refresh-token` | Authenticated | Get current authenticated user |

### 5.2 Properties (Public)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/v1/properties` | Public | Get all properties with filters (location, price, type) |
| GET | `/api/v1/properties/:id` | Public | Get property details |
| GET | `/api/v1/categories` | Public | Get all property categories |

### 5.3 Landlord Management
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/landlord/properties` | Landlord | Create new property listing |
| PUT | `/api/v1/landlord/properties/:id` | Landlord (owner) | Update property listing |
| DELETE | `/api/v1/landlord/properties/:id` | Landlord (owner) | Remove property listing |
| GET | `/api/v1/landlord/requests` | Landlord | Get all rental requests for landlord's properties |
| PATCH | `/api/v1/landlord/requests/:id` | Landlord (owner) | Approve or reject a rental request |

### 5.4 Rental Requests
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/vq/rentals` | Tenant | Submit a rental request |
| GET | `/api/v1/rentals` | Authenticated | Get current user's rental requests |
| GET | `/api/v1/rentals/:id` | Authenticated (owner) | Get rental request details |

### 5.5 Payments (Stripe / SSLCommerz)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/payments/create` | Tenant | Create a payment intent/session for an approved rental |
| POST | `/api/payments/confirm` | Webhook / Callback | Confirm/verify payment |
| GET | `/api/payments` | Tenant | Get user's payment history |
| GET | `/api/payments/:id` | Tenant (owner) | Get payment details |

### 5.6 Reviews
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/reviews` | Tenant | Create review (only after a completed rental) |

### 5.7 Admin
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/admin/users` | Admin | Get all users |
| PATCH | `/api/admin/users/:id` | Admin | Update user status (BANNED/INACTIVE/ACTIVE) |
| GET | `/api/admin/properties` | Admin | Get all properties |
| GET | `/api/admin/rental-requests` | Admin | Get all rental requests |

> ⚠️ Endpoints above are a baseline reference implementation — additional endpoints (e.g., category management, profile update) may be added as needed.

---

## 6. Business Rules & Workflow

### Rental Request Lifecycle
```
PENDING → (landlord approves) → APPROVED → (tenant pays) → ACTIVE → COMPLETED
PENDING → (landlord rejects)  → REJECTED
```
- A request starts as `PENDING` when a tenant submits it.
- The **landlord** approves or rejects it.
- On **approval**, the tenant must complete payment (Stripe or SSLCommerz) to move the request to `ACTIVE`.
- Once the rental term concludes, status becomes `COMPLETED`.
- Reviews can only be created for `COMPLETED` rental requests.

### Tenant Journey
Register → Browse Properties → View Property Details → Submit Request → Wait for Approval → Make Payment → Leave Review

### Landlord Journey
Register → Create Listings → View Requests → Approve/Reject → Manage Properties

### Key Constraints
- Only the owning landlord can approve/reject/edit/delete a given property or its requests.
- Payments are only allowed against `APPROVED` rental requests.
- Reviews are restricted to tenants with a `COMPLETED` rental request for that property.
- Banned users (`status: banned`) should be blocked from authenticating or performing actions.

---

## 7. Tech Stack

See the repository's `README.md` for the full, authoritative technology specification. In general, this class of project expects:
- **Backend**: Node.js / Express
- **Database**: MongoDB (Mongoose) or a SQL database via an ORM
- **Auth**: JWT-based authentication with bcrypt password hashing
- **Payments**: Stripe and/or SSLCommerz integration
- **Validation**: Zod / Joi or equivalent

---

## 8. Summary Table

| Domain | Primary Entities | Primary Roles Involved |
|---|---|---|
| Auth | User | All |
| Listings | Property, Category | Landlord (write), Public (read) |
| Rentals | RentalRequest | Tenant, Landlord |
| Payments | Payment | Tenant |
| Reviews | Review | Tenant |
| Moderation | User, Property, RentalRequest | Admin |

---

*Source specification: [B7A4/1-RentNest.md](https://github.com/Apollo-Level2-Web-Dev/B7A4/blob/main/1-RentNest.md)*