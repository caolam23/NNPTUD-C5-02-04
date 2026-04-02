# Messaging API - Quick Start Guide

## What's New

Three new routers have been created for the messaging system:

### 1. **GET /api/v1/messages**
Returns the last message with each user (conversation list)

### 2. **GET /api/v1/messages/:userID**
Returns all messages exchanged with a specific user (conversation history)

### 3. **POST /api/v1/messages**
Sends a new message (text or file)

---

## Setup Instructions

### Step 1: Git Initialization & Commit
```bash
cd d:\Downloads\NNPTUD-C5-26-3

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add messaging system with 3 routers - GET /, GET /:userID, POST /"
```

### Step 2: Testing with Postman

#### Prerequisites:
- Start your Node.js server: `npm start`
- Login first and copy the JWT token from response

#### Test Case 1: Get Conversation List
```
Method: GET
URL: http://localhost:3000/api/v1/messages
Headers: Authorization: Bearer <your_token>
```

#### Test Case 2: Send Text Message
```
Method: POST
URL: http://localhost:3000/api/v1/messages
Headers: Authorization: Bearer <your_token>
         Content-Type: application/json
Body:
{
  "to": "60d5ec49f1b2c72c1a123456",
  "messageContent": {
    "type": "text",
    "text": "Hello! This is my test message"
  }
}
```

#### Test Case 3: Send File Message
```
Method: POST
URL: http://localhost:3000/api/v1/messages
Headers: Authorization: Bearer <your_token>
         Content-Type: application/json
Body:
{
  "to": "60d5ec49f1b2c72c1a123456",
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  }
}
```

#### Test Case 4: Get Conversation with Specific User
```
Method: GET
URL: http://localhost:3000/api/v1/messages/60d5ec49f1b2c72c1a123456
Headers: Authorization: Bearer <your_token>
```

---

## Files Modified/Created

**New Files:**
- `schemas/messages.js`
- `controllers/messages.js`
- `routes/messages.js`
- `MESSAGING_API_DOCUMENTATION.md`

**Modified Files:**
- `app.js` (added messages route)

---

## Expected Responses

### ✅ Success (200)
```json
{
  "_id": "messageId",
  "from": { "username": "john", ... },
  "to": { "username": "jane", ... },
  "messageContent": { "type": "text", "text": "..." },
  "createdAt": "2024-03-26T10:30:00Z"
}
```

### ❌ Error (400)
```json
{
  "message": "Validation error message"
}
```

### ❌ Unauthorized (404)
```json
"ban chua dang nhap"  // (Vietnamese: "You are not logged in")
```

---

## Notes

- All routers require authentication (checkLogin middleware)
- Messages are sorted chronologically in conversation history
- Conversation list shows most recent message first
- File messages store the file path in the `text` field
- All messages are timestamped automatically
- Soft delete is supported via `isDeleted` flag
