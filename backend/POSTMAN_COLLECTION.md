# Postman API Test Data

## Base URL
```
http://localhost:4000/api
```

---

## 1. GET Products

**Method:** `GET`  
**URL:** `http://localhost:4000/api/products`  
**Headers:** None  
**Body:** None

**Expected Response:**
```json
[
  {
    "id": "p1",
    "name": "Vibe T-Shirt",
    "price": 1999,
    "image": "https://picsum.photos/seed/vibe1/400/300"
  },
  {
    "id": "p2",
    "name": "Vibe Hoodie",
    "price": 4999,
    "image": "https://picsum.photos/seed/vibe2/400/300"
  }
]
```

---

## 2. GET Cart

**Method:** `GET`  
**URL:** `http://localhost:4000/api/cart`  
**Headers:** None  
**Body:** None

**Expected Response:**
```json
{
  "items": [],
  "total": 0
}
```

---

## 3. POST - Add to Cart

**Method:** `POST`  
**URL:** `http://localhost:4000/api/cart`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "productId": "p1",
  "qty": 2
}
```

**Example Variations:**
```json
// Add 1 Vibe T-Shirt
{
  "productId": "p1",
  "qty": 1
}

// Add 3 Vibe Hoodies
{
  "productId": "p2",
  "qty": 3
}

// Add 1 Vibe Cap
{
  "productId": "p3",
  "qty": 1
}

// Add 2 Vibe Socks
{
  "productId": "p4",
  "qty": 2
}

// Add 1 Vibe Mug
{
  "productId": "p5",
  "qty": 1
}

// Add 1 Vibe Tote
{
  "productId": "p6",
  "qty": 1
}
```

**Expected Response:**
```json
{
  "id": "ci_1762438741524",
  "productId": "p1",
  "qty": 2
}
```

---

## 4. PATCH - Update Cart Item Quantity

**Method:** `PATCH`  
**URL:** `http://localhost:4000/api/cart/{itemId}`  
**Note:** Replace `{itemId}` with actual cart item ID from GET /api/cart response

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "qty": 5
}
```

**Example Variations:**
```json
// Update to quantity 1
{
  "qty": 1
}

// Update to quantity 10
{
  "qty": 10
}

// Update to quantity 3
{
  "qty": 3
}
```

**Expected Response:**
```json
{
  "id": "ci_1762438741524",
  "qty": 5
}
```

---

## 5. DELETE - Remove Cart Item

**Method:** `DELETE`  
**URL:** `http://localhost:4000/api/cart/{itemId}`  
**Note:** Replace `{itemId}` with actual cart item ID from GET /api/cart response

**Headers:** None  
**Body:** None

**Expected Response:**
```
204 No Content
```

---

## 6. POST - Checkout

**Method:** `POST`  
**URL:** `http://localhost:4000/api/checkout`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Example Variations:**
```json
// Example 1
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}

// Example 2
{
  "name": "Bob Johnson",
  "email": "bob.johnson@email.com"
}

// Example 3
{
  "name": "Alice Williams",
  "email": "alice.w@test.com"
}
```

**Expected Response:**
```json
{
  "receipt": {
    "customer": {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "items": [
      {
        "id": "ci_1762438741524",
        "productId": "p1",
        "qty": 2,
        "name": "Vibe T-Shirt",
        "price": 1999,
        "lineTotal": 3998
      }
    ],
    "total": 3998,
    "timestamp": "2025-11-06T15:30:45.123Z"
  }
}
```

---

## Complete Test Flow in Postman

### Step 1: Get Products
```
GET http://localhost:4000/api/products
```

### Step 2: Add Items to Cart
```
POST http://localhost:4000/api/cart
Body: {"productId":"p1","qty":2}

POST http://localhost:4000/api/cart
Body: {"productId":"p3","qty":1}
```

### Step 3: View Cart
```
GET http://localhost:4000/api/cart
```
Copy the `id` from the response (e.g., `ci_1762438741524`)

### Step 4: Update Quantity
```
PATCH http://localhost:4000/api/cart/ci_1762438741524
Body: {"qty":3}
```

### Step 5: Remove Item
```
DELETE http://localhost:4000/api/cart/ci_1762438741524
```

### Step 6: Checkout
```
POST http://localhost:4000/api/checkout
Body: {"name":"John Doe","email":"john.doe@example.com"}
```

---

## Product IDs Reference

- `p1` - Vibe T-Shirt ($19.99)
- `p2` - Vibe Hoodie ($49.99)
- `p3` - Vibe Cap ($14.99)
- `p4` - Vibe Socks ($9.99)
- `p5` - Vibe Mug ($12.99)
- `p6` - Vibe Tote ($24.99)

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 404 Not Found
```json
{
  "error": "Item not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```


