# QAROT Men - Full-Stack E-Commerce Application

QAROT Men is a full-stack e-commerce web application designed for modern men's fashion. It features a fully-functional customer shopping experience (browsing products, filtering by categories, search, interactive cart, wishlist, and secure Razorpay payment integration) alongside a comprehensive Admin Dashboard to manage inventory, view registered users, and track order histories.

---

## 🚀 Key Features

### 🛍️ Customer Experience
- **Interactive Home Page**: Features animated category banners, collection highlights, and trending items (leveraging AOS animations).
- **Product Details & Sizing**: Selectable sizes, high-quality image galleries, and detailed product descriptions.
- **Dynamic Cart & Wishlist**: Context-driven shopping bag and wishlist with real-time badge counters in the navigation bar.
- **Search & Filter**: Search products by name, description, category, and filter through dedicated category drops (Ethnicwear, Festive 2026, SUMMER 2026, Pants, Shorts, Loungewear).
- **Seamless Checkout**: Address management, delivery payment gateway integration (Razorpay / Cash on Delivery), and dynamic order confirmation receipt.
- **Order Tracking**: Detailed individual order viewing with itemization, pricing, shipping details, and order status.

### 🛡️ Authentication & Security
- **JWT-Based Session Management**: Secure tokens for API access stored in `localStorage` client-side.
- **OTP Verification**: Built-in OTP validation via email (using Nodemailer) for registrations and secure password resets.
- **Password Hashing**: Secure storage of customer credentials using `bcryptjs`.
- **Role-Based Routing**: Restricts access to admin panels via specialized middleware (`isAdmin`).

### ⚙️ Administrative Dashboard
- **Dashboard Metrics**: Summary of users, products, and order activity.
- **Product Management**: Complete CRUD operations (Create, Read, Update, Delete) to manage product inventory directly from the client.
- **Order Tracking**: Global admin view of all customer orders.
- **User Directory**: View registration data for all registered users.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite build tool with Rolldown compiler integration)
- **Styling**: Bootstrap 5 + Bootstrap Icons for responsive layout, custom CSS for premium design details.
- **Animations**: AOS (Animate On Scroll) for clean micro-animations.
- **Routing**: React Router DOM v7 for client-side routing.
- **State Management**: React Context API (`CartContext` and `WishlistContext`).
- **HTTP Client**: Axios for backend service connection.

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB (Object modeling via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) + BcryptJS
- **Payments**: Razorpay Node SDK
- **Mailing**: Nodemailer (Gmail integration)
- **File Uploads**: Multer
- **Development**: Nodemon

---

## 📁 Directory Structure

```text
qarotmen/
├── backend/
│   ├── config/
│   │   └── db.js                  # Database connection configuration
│   ├── controller/
│   │   ├── Account_Controller.js  # Reg, login, password reset, OTP handlers
│   │   ├── Admin_Controller.js    # User, product and order management (Admin)
│   │   ├── Cart_Contoller.js      # Cart CRUD handlers
│   │   ├── Order_Controller.js    # Razorpay and cash-on-delivery placements
│   │   ├── Product_Controller.js  # Product display, search and database seeding
│   │   └── Wishlist_Controller.js # Wishlist toggling logic
│   ├── middleware/
│   │   └── auth.js                # JWT token validation & admin checkers
│   ├── model/
│   │   ├── Account_Model.js       # User database schema
│   │   ├── Cart_Model.js          # Cart items schema
│   │   ├── Order_Model.js         # Order placement schema
│   │   ├── Product_Model.js       # Product schema
│   │   └── Wishlist_Model.js      # Wishlist schema
│   ├── route/                     # API routers matching controllers
│   │   ├── Account_Route.js
│   │   ├── Admin_Route.js
│   │   ├── Cart_Route.js
│   │   ├── Order_Route.js
│   │   ├── Product_Route.js
│   │   └── Wishlist_Route.js
│   ├── upload/                    # Directory for product asset uploads
│   ├── .env                       # Environmental settings (Git-ignored)
│   ├── Server.js                  # Application entry point
│   └── package.json               # Backend configuration
│
└── frontend/
    ├── public/                    # Static assets
    ├── src/
    │   ├── assets/                # Local styling assets & graphics
    │   ├── Component/             # Reusable UI parts (Navbar, Footer, Modals)
    │   ├── context/               # Global contexts for Cart & Wishlist state
    │   ├── Page/                  # Main routed page components
    │   ├── Services/
    │   │   └── Api.js             # Base Axios configuration
    │   ├── App.jsx                # Client application router setup
    │   ├── global.css             # Base styles, grids, typography customizations
    │   └── main.jsx               # React DOM entry point
    ├── index.html                 # HTML template
    ├── vite.config.js             # Vite build settings
    └── package.json               # Frontend dependencies & scripts
```

---

## 🗄️ Database Schemas (Mongoose)

### Account Schema
```javascript
{
  email: { type: String, unique: true },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  role: { type: String }, // e.g., 'admin' or 'user'
  otp: { type: String },
  otpExpiration: { type: Date }
}
```

### Product Schema
```javascript
{
  name: { type: String },
  sku: { type: String },
  price: { type: Number },
  category: { type: String },
  images: [String],
  description: { type: String }
}
```

### Cart Schema
```javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  size: { type: String },
  qty: { type: Number }
}
```

### Wishlist Schema
```javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
}
```

### Order Schema
```javascript
{
  orderNo: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
  orderDate: { type: Date, default: Date.now },
  shippingDetails: {
    firstname: String,
    lastname: String,
    mobile: String,
    address: String,
    postalcode: String,
    state: String,
    city: String
  },
  paymentMethod: { type: String }, // e.g., "COD" or "Online"
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
      size: String,
      price: Number
    }
  ],
  totalAmount: { type: Number }
}
```

---

## 🔌 API Documentation

| Endpoint | Method | Authentication | Description |
| :--- | :---: | :---: | :--- |
| **Authentication & Accounts** | | | |
| `/register` | POST | None | Sign up a new user account |
| `/login` | POST | None | Authenticate user and receive JWT |
| `/profile` | GET | User Token | Retrieve active user's details |
| `/send-otp` | POST | None | Send password reset OTP to email |
| `/verify-otp` | POST | None | Verify OTP code expiration & match |
| `/reset-password` | POST | None | Update account password after OTP validation |
| **Catalog & Products** | | | |
| `/products` | GET | None | Fetch all product listings |
| `/findproduct?id=...` | GET | None | Fetch detailed info for single product |
| `/search?query=...` | GET | None | Search products by name, description, etc. |
| **Cart Operations** | | | |
| `/cart` | POST | User Token | Add/update item quantities or sizes in cart |
| `/cartshow` | GET | User Token | View active items in user's cart |
| `/cartdelete/:id` | DELETE | User Token | Remove item from cart by ID |
| **Wishlist Operations** | | | |
| `/wishlist` | GET | User Token | View all active items in user's wishlist |
| `/wishlist-toggle` | POST | User Token | Add or remove a product from the wishlist |
| **Orders** | | | |
| `/placeorder` | POST | User Token | Place an order (COD or post-payment) and clear cart |
| `/myorders` | GET | User Token | Retrieve order history for the active user |
| `/order/:id` | GET | User Token | Retrieve single order details with item descriptions |
| `/create-razorpay-order` | POST | User Token | Initialize a transaction with Razorpay |
| **Admin Operations** | | | |
| `/admin/users` | GET | Admin Token | Get listing of all registered accounts |
| `/admin/orders` | GET | Admin Token | Get listing of all checkout transactions globally |
| `/admin/product` | POST | Admin Token | Add new product details into catalog |
| `/admin/product/:id` | PUT | Admin Token | Edit attributes/details of a catalog item |
| `/admin/product/:id` | DELETE | Admin Token | Delete a product from inventory |

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js installed locally.
- MongoDB instance (Atlas cloud or local cluster).
- Razorpay account (for payment functionality).

### 1. Clone & Set Up Backend

Navigate to the `backend` folder:
```bash
cd backend
npm install
```

Create a `.env` file in the root of the `/backend` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/qarotmen
JWT_SECRET=your_super_secret_jwt_key
```

> [!WARNING]
> The current backend configuration contains hardcoded credentials for Nodemailer (Gmail transporter) and Razorpay test credentials in `Account_Controller.js` and `Order_Controller.js`. It is highly recommended to move these into your `.env` variables before moving to staging or production.

Run the backend server:
```bash
# Runs development server using nodemon
npm start
```

*Note: On the first database connection, the server runs `default_product()` to automatically seed the product catalog with initial listings if the collections are empty.*

### 2. Set Up Frontend

Navigate to the `frontend` folder:
```bash
cd ../frontend
npm install
```

Update `/frontend/src/Services/Api.js` to point to your local backend server if running locally:
```javascript
import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000" // Change this from https://qarotmen.onrender.com for local testing
});

export default Api;
```

Run the frontend development server:
```bash
npm run dev
```

The application will be accessible at the Vite host (usually `http://localhost:5173`).

---

## 🚀 Deployment

- **Frontend**: Ready to be hosted on platforms like **Vercel** or **Netlify** (a `vercel.json` rewrite configuration is pre-configured).
- **Backend**: Suitable for deployment on **Render**, **Heroku**, or **DigitalOcean** node hosts. Keep in mind static media uploaded through Multer will require persistent volumes or shifting to cloud storage providers (like Cloudinary or AWS S3) for production reliability.
