# Messaging System Documentation

## Schema: Message (schemas/messages.js)

```javascript
{
  from: ObjectId (ref: user) - who sends the message,
  to: ObjectId (ref: user) - who receives the message,
  messageContent: {
    type: String - enum ["file", "text"],
    text: String - content text or file path
  },
  createdAt: Date - created timestamp,
  isDeleted: Boolean - soft delete flag
}
```

## API Endpoints

### Base URL
```
/api/v1/messages
```

---

### 1. GET /api/v1/messages/ 
**Get last message with each user**

Returns the last message exchanged between the current user and each other user.

**Headers:**
- `Authorization: Bearer <token>` (or use Cookie: TOKEN_LOGIN=<token>)

**Response (200):**
```json
[
  {
    "user": {
      "_id": "userId",
      "username": "username1",
      "email": "user1@email.com",
      "fullName": "User One",
      "avatarUrl": "..."
    },
    "lastMessage": {
      "_id": "messageId",
      "from": {...},
      "to": {...},
      "messageContent": {
        "type": "text",
        "text": "Hello!"
      },
      "createdAt": "2024-03-26T10:30:00Z"
    }
  }
]
```

---

### 2. GET /api/v1/messages/:userID
**Get all messages with a specific user**

Returns all messages (sent and received) between current user and the specified user, sorted by date.

**Parameters:**
- `userID` (path) - The ID of the other user

**Headers:**
- `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "_id": "messageId1",
    "from": {
      "_id": "currentUserId",
      "username": "john",
      "email": "john@email.com",
      "fullName": "John Doe"
    },
    "to": {
      "_id": "otherUserId",
      "username": "jane",
      "email": "jane@email.com",
      "fullName": "Jane Doe"
    },
    "messageContent": {
      "type": "text",
      "text": "Hi Jane!"
    },
    "createdAt": "2024-03-26T10:00:00Z"
  },
  {
    "_id": "messageId2",
    "from": {
      "_id": "otherUserId",
      "username": "jane"
    },
    "to": {
      "_id": "currentUserId",
      "username": "john"
    },
    "messageContent": {
      "type": "text",
      "text": "Hi John! How are you?"
    },
    "createdAt": "2024-03-26T10:05:00Z"
  }
]
```

---

### 3. POST /api/v1/messages/
**Send a message**

Send a text or file message to another user.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "to": "recipientUserId",
  "messageContent": {
    "type": "text",
    "text": "Your message content here"
  }
}
```

**For file messages:**
```json
{
  "to": "recipientUserId",
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  }
}
```

**Response (200):**
```json
{
  "_id": "newMessageId",
  "from": {
    "_id": "currentUserId",
    "username": "john",
    "email": "john@email.com",
    "fullName": "John Doe"
  },
  "to": {
    "_id": "recipientUserId",
    "username": "jane",
    "email": "jane@email.com",
    "fullName": "Jane Doe"
  },
  "messageContent": {
    "type": "text",
    "text": "Your message content here"
  },
  "createdAt": "2024-03-26T10:30:00Z"
}
```

---

## Testing with Postman

### Setup:
1. Set base URL in Postman: `http://localhost:3000`
2. After login, copy the JWT token from response
3. In each request, add Authorization header:
   - Type: `Bearer Token`
   - Token: `<your_jwt_token>`

### Test Scenarios:

#### Test 1: Get last message with each user
- **Method:** GET
- **URL:** `http://localhost:3000/api/v1/messages/`
- **Result:** Shows all users you're communicating with and last message with each

#### Test 2: Send a text message
- **Method:** POST
- **URL:** `http://localhost:3000/api/v1/messages/`
- **Body (JSON):**
  ```json
  {
    "to": "USER_ID_HERE",
    "messageContent": {
      "type": "text",
      "text": "Hello! This is a test message"
    }
  }
  ```

#### Test 3: Send a file message
- **Method:** POST
- **URL:** `http://localhost:3000/api/v1/messages/`
- **Body (JSON):**
  ```json
  {
    "to": "USER_ID_HERE",
    "messageContent": {
      "type": "file",
      "text": "/uploads/test-file.pdf"
    }
  }
  ```

#### Test 4: Get all messages with a specific user
- **Method:** GET
- **URL:** `http://localhost:3000/api/v1/messages/USER_ID_HERE`
- **Result:** Shows conversation history with that user

---

## Files Created/Modified

### New Files:
1. `schemas/messages.js` - MongoDB message schema
2. `controllers/messages.js` - Message business logic
3. `routes/messages.js` - Message API endpoints

### Modified Files:
1. `app.js` - Added messages route registration

## Features:

✅ Get conversation list (last message with each user)
✅ Send text messages
✅ Send file messages (with file path)
✅ Retrieve full conversation with specific user
✅ User authentication required (checkLogin)
✅ Automatic user population (sender/receiver details)
✅ Sorted by date (latest first for conversation list, chronological for message history)
✅ Soft delete support (isDeleted flag)
