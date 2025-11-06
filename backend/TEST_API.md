# API Test Data & Examples

## Base URL
```
http://localhost:4000/api
```

---

## 1. Get Products

**GET** `/api/products`

### Response:
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
  },
  {
    "id": "p3",
    "name": "Vibe Cap",
    "price": 1499,
    "image": "https://picsum.photos/seed/vibe3/400/300"
  },
  {
    "id": "p4",
    "name": "Vibe Socks",
    "price": 999,
    "image": "https://picsum.photos/seed/vibe4/400/300"
  },
  {
    "id": "p5",
    "name": "Vibe Mug",
    "price": 1299,
    "image": "https://picsum.photos/seed/vibe5/400/300"
  },
  {
    "id": "p6",
    "name": "Vibe Tote",
    "price": 2499,
    "image": "https://picsum.photos/seed/vibe6/400/300"
  }
]
```

### Test:
```bash
curl http://localhost:4000/api/products
```

---

## 2. Get Cart

**GET** `/api/cart`

### Response:
```json
{
  "items": [
    {
      "id": "ci_1762438741524",
      "productId": "p1",
      "qty": 2,
      "name": "Vibe T-Shirt",
      "price": 1999,
      "image": "https://picsum.photos/seed/vibe1/400/300",
      "lineTotal": 3998
    }
  ],
  "total": 3998
}
```

### Test:
```bash
curl http://localhost:4000/api/cart
```

---

## 3. Add to Cart

**POST** `/api/cart`

### Request Body:
```json
{
  "productId": "p1",
  "qty": 2
}
```

### Response:
```json
{
  "id": "ci_1762438741524",
  "productId": "p1",
  "qty": 2
}
```

### Test:
```bash
curl -X POST http://localhost:4000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"p1","qty":2}'
```

### PowerShell:
```powershell
$body = @{productId='p1';qty=2} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:4000/api/cart -Method Post -Body $body -ContentType 'application/json'
```

---

## 4. Update Cart Item Quantity

**PATCH** `/api/cart/:id`

### Request Body:
```json
{
  "qty": 3
}
```

### Response:
```json
{
  "id": "ci_1762438741524",
  "qty": 3
}
```

### Test:
```bash
curl -X PATCH http://localhost:4000/api/cart/ci_1762438741524 \
  -H "Content-Type: application/json" \
  -d '{"qty":3}'
```

### PowerShell:
```powershell
$body = @{qty=3} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:4000/api/cart/ci_1762438741524 -Method Patch -Body $body -ContentType 'application/json'
```

---

## 5. Remove Cart Item

**DELETE** `/api/cart/:id`

### Response:
```
204 No Content
```

### Test:
```bash
curl -X DELETE http://localhost:4000/api/cart/ci_1762438741524
```

### PowerShell:
```powershell
Invoke-RestMethod -Uri http://localhost:4000/api/cart/ci_1762438741524 -Method Delete
```

---

## 6. Checkout

**POST** `/api/checkout`

### Request Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

### Response:
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
      },
      {
        "id": "ci_1762438741525",
        "productId": "p3",
        "qty": 1,
        "name": "Vibe Cap",
        "price": 1499,
        "lineTotal": 1499
      }
    ],
    "total": 5497,
    "timestamp": "2025-11-06T14:52:45.123Z"
  }
}
```

### Test:
```bash
curl -X POST http://localhost:4000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john.doe@example.com"}'
```

### PowerShell:
```powershell
$body = @{name='John Doe';email='john.doe@example.com'} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:4000/api/checkout -Method Post -Body $body -ContentType 'application/json'
```

---

## Complete Test Flow

### Step 1: Get Products
```bash
curl http://localhost:4000/api/products
```

### Step 2: Add Items to Cart
```bash
curl -X POST http://localhost:4000/api/cart -H "Content-Type: application/json" -d '{"productId":"p1","qty":2}'
curl -X POST http://localhost:4000/api/cart -H "Content-Type: application/json" -d '{"productId":"p3","qty":1}'
```

### Step 3: View Cart
```bash
curl http://localhost:4000/api/cart
```

### Step 4: Update Quantity
```bash
# Get the cart item ID from step 3, then:
curl -X PATCH http://localhost:4000/api/cart/ci_1762438741524 -H "Content-Type: application/json" -d '{"qty":3}'
```

### Step 5: Checkout
```bash
curl -X POST http://localhost:4000/api/checkout -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john.doe@example.com"}'
```

---

## Price Format

All prices are stored in **cents** (integer):
- `1999` = $19.99
- `4999` = $49.99
- `1499` = $14.99

To convert to dollars: `price / 100`

