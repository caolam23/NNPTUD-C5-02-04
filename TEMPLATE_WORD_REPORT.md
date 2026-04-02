# TEMPLATE WORD - Messaging API Testing Report

---

## **MESSAGING API - POSTMAN TESTING DOCUMENTATION**

### **Học viên:** [Tên của bạn]
### **Ngày:** 26/03/2024
### **Module:** Messaging System (3 Routers)

---

## **1. GIỚI THIỆU**

Hệ thống Messaging API bao gồm 3 router chính:

| Router | Method | Endpoint | Mô tả |
|--------|--------|----------|-------|
| Router 1 | GET | `/api/v1/messages` | Lấy danh sách cuối cùng của mỗi user |
| Router 2 | POST | `/api/v1/messages` | Gửi tin nhắn (text/file) |
| Router 3 | GET | `/api/v1/messages/:userID` | Lấy toàn bộ tin nhắn với 1 user |

---

## **2. ROUTER 1: GET /api/v1/messages**

### **Mô tả:**
Lấy danh sách tin nhắn cuối cùng của mỗi user mà user hiện tại nhắn tin hoặc user khác nhắn cho user hiện tại.

### **Request:**
```
Method: GET
URL: http://localhost:3000/api/v1/messages
Header: Authorization: Bearer [TOKEN]
```

### **Response:**
Trả về array các object chứa user và lastMessage

### **Screenshot:**
[**CHỤP ẢNH POSTMAN TẠI ĐÂY**]

---

## **3. ROUTER 2: POST /api/v1/messages (Text)**

### **Mô tả:**
Gửi tin nhắn text tới user khác.

**Thành phần:**
- `to`: userID của người nhận
- `messageContent.type`: "text"
- `messageContent.text`: nội dung tin nhắn

### **Request:**
```
Method: POST
URL: http://localhost:3000/api/v1/messages
Header: Authorization: Bearer [TOKEN]
Header: Content-Type: application/json

Body:
{
  "to": "60d5ec49f1b2c72c1a123456",
  "messageContent": {
    "type": "text",
    "text": "Xin chào bạn!"
  }
}
```

### **Response:**
```json
{
  "_id": "message_id",
  "from": { user info },
  "to": { user info },
  "messageContent": {
    "type": "text",
    "text": "Xin chào bạn!"
  },
  "createdAt": "2026-04-02T10:30:00Z"
}
```

### **Screenshot:**
[**CHỤP ẢNH POSTMAN TẠI ĐÂY**]

---

## **4. ROUTER 3: POST /api/v1/messages (File)**

### **Mô tả:**
Gửi tin nhắn file (hoặc link file) tới user khác.

**Thành phần:**
- `to`: userID của người nhận
- `messageContent.type`: "file"
- `messageContent.text`: đường dẫn file (/uploads/document.pdf)

### **Request:**
```
Method: POST
URL: http://localhost:3000/api/v1/messages
Header: Authorization: Bearer [TOKEN]
Header: Content-Type: application/json

Body:
{
  "to": "60d5ec49f1b2c72c1a123456",
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  }
}
```

### **Response:**
```json
{
  "_id": "message_id",
  "from": { user info },
  "to": { user info },
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  },
  "createdAt": "2026-04-02T10:35:00Z"
}
```

### **Screenshot:**
[**CHỤP ẢNH POSTMAN TẠI ĐÂY**]

---

## **5. ROUTER 4: GET /api/v1/messages/:userID**

### **Mô tả:**
Lấy toàn bộ tin nhắn giữa user hiện tại và 1 user khác (lịch sử trò chuyện).

**Thành phần:**
- `:userID` = ID của user muốn xem cuộc chat

### **Request:**
```
Method: GET
URL: http://localhost:3000/api/v1/messages/60d5ec49f1b2c72c1a123456
Header: Authorization: Bearer [TOKEN]
```

### **Response:**
Trả về array chứa tất cả tin nhắn giữa 2 user (sắp xếp theo thời gian)

```json
[
  {
    "from": { user1 },
    "to": { user2 },
    "messageContent": { type, text }
  },
  {
    "from": { user2 },
    "to": { user1 },
    "messageContent": { type, text }
  }
]
```

### **Screenshot:**
[**CHỤP ẢNH POSTMAN TẠI ĐÂY**]

---

## **6. GIT COMMIT**

### **Lệnh:**
```powershell
cd d:\Downloads\NNPTUD-C5-26-3
git add .
git commit -m "Add messaging API: GET /, POST /, GET /:userID for text and file messages"
git log --oneline
```

### **Screenshot Git Commit:**
[**CHỤP ẢNH TERMINAL TẠI ĐÂY**]

### **Screenshot Git Log:**
[**CHỤP ẢNH TERMINAL TẠI ĐÂY**]

---

## **7. KẾT LUẬN**

✅ Hoàn thành 3 router:
- GET / - Hiển thị danh sách cuộc hội thoại
- POST / - Gửi tin nhắn (text hoặc file)
- GET /:userID - Xem lịch sử trò chuyện

✅ Tất cả router sử dụng authentication (JWT Token)

✅ Response format đầy đủ với user info

✅ Git repository đã được commit

---

## **DANH SÁCH FILE ĐƯỢC TẠO/THAY ĐỔI**

| File | Loại | Mô tả |
|------|------|-------|
| schemas/messages.js | New | MongoDB schema cho message |
| controllers/messages.js | New | Controller xử lý logic |
| routes/messages.js | New | 3 router chính |
| app.js | Modified | Thêm route registration |

---

**Hoàn thành ngày:** [Ngày hiện tại]

**Ghi chú:** [Ghi chú thêm nếu cần]

---
