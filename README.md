# Vibe Commerce - Mock Shopping Cart

A full-stack e-commerce shopping cart application built for Vibe Commerce screening. Features product browsing, cart management, and mock checkout functionality.

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB (Mongoose)
- **Styling**: CSS3 with responsive design

## Project Structure

```
Task/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server
│   │   ├── storage/
│   │   │   └── db.js          # Database setup & seeding
│   │   └── routes/
│   │       ├── products.js    # Products API
│   │       ├── cart.js        # Cart CRUD API
│   │       └── checkout.js    # Checkout API
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Products.jsx   # Products grid page
│   │   │   └── Cart.jsx       # Cart page
│   │   ├── components/
│   │   │   └── CheckoutModal.jsx  # Checkout form & receipt
│   │   ├── services/
│   │   │   └── api.js         # API client functions
│   │   ├── App.jsx            # Main app with routing
│   │   └── main.jsx           # Entry point
│   └── package.json
└── README.md
```

## Features

### Backend APIs

- `GET /api/products` - Fetch all products (5-10 mock items)
- `POST /api/cart` - Add item to cart (productId, qty)
- `GET /api/cart` - Get cart with items and total
- `PATCH /api/cart/:id` - Update item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout (name, email) → returns mock receipt

### Frontend

- **Products Page**: Grid display with "Add to Cart" buttons
- **Cart Page**: View items, update quantities, remove items, see total
- **Checkout Modal**: Form for name/email, displays receipt after submission
- **Responsive Design**: Works on mobile, tablet, and desktop

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. **Set up MongoDB connection:**

   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb+srv://sasivarthankg_db_user:YOUR_PASSWORD@cluster0.tmq8nmr.mongodb.net/vibe_cart?retryWrites=true&w=majority
   ```
   
   Or set the password separately:
   ```env
   MONGODB_URI=mongodb+srv://sasivarthankg_db_user:<db_password>@cluster0.tmq8nmr.mongodb.net/vibe_cart?retryWrites=true&w=majority
   DB_PASSWORD=your_password_here
   ```

2. **Install dependencies and start:**
   ```bash
   cd backend
   npm install
   npm start
   ```

The backend will run on `http://localhost:4000`

The database will automatically connect to MongoDB and seed products on first run.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

The Vite dev server is configured to proxy `/api` requests to the backend.

## API Endpoints

### Products

```
GET /api/products
Response: [{ id, name, price, image }, ...]
```

### Cart

```
GET /api/cart
Response: { items: [...], total: number }

POST /api/cart
Body: { productId: string, qty: number }
Response: { id, productId, qty }

PATCH /api/cart/:id
Body: { qty: number }
Response: { id, qty }

DELETE /api/cart/:id
Response: 204 No Content
```

### Checkout

```
POST /api/checkout
Body: { name: string, email: string }
Response: {
  receipt: {
    customer: { name, email },
    items: [...],
    total: number,
    timestamp: string
  }
}
```

## Database Schema

### Products Collection
- `id` (String, unique, required)
- `name` (String, required)
- `price` (Number - stored in cents, required)
- `image` (String)

### Cart Items Collection
- `id` (String, unique, required)
- `productId` (String, references Product.id, required)
- `qty` (Number, min: 1, required)

## Screenshots

### Products Page
- Grid layout showing all available products
- Each product card displays image, name, price, and "Add to Cart" button

### Cart Page
- List of cart items with images
- Quantity controls (+/- buttons)
- Remove item button
- Cart summary sidebar with total
- "Proceed to Checkout" button

### Checkout Modal
- Form for customer name and email
- Displays order total
- After submission, shows receipt with:
  - Customer information
  - Order items and quantities
  - Total amount
  - Order timestamp

## Error Handling

- Backend validates all inputs using Zod
- Frontend displays error messages for failed API calls
- Graceful handling of empty cart states
- Loading states during async operations

## Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 480px
- Cart items stack vertically on mobile
- Modal adapts to screen size
- Touch-friendly buttons and controls

## Future Enhancements (Bonus Features)

- [ ] User authentication and cart persistence per user
- [ ] Integration with Fake Store API for real product data
- [ ] Toast notifications for cart actions
- [ ] Product search and filtering
- [ ] Order history page

## License

This project is created for Vibe Commerce screening purposes.

