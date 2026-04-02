# HƯỚNG DẪN TEST POSTMAN - CHI TIẾT ĐẦY ĐỦ

---

## **PHẦN 1: CHUẨN BỊ**

### **1.1 Kiểm tra Server Chạy**
```
Terminal có output:
connected
```

### **1.2 Có sẵn 2-3 User trong DB**
- Nếu chưa, tạo user bằng POST `/api/v1/auth/register`

### **1.3 Lấy JWT Token**
- Gọi POST `/api/v1/auth/login` 
- Sao chép token từ response
- Token sẽ dùng cho tất cả request

---

## **PHẦN 2: CÁC ROUTER CẦN TEST**

### **📌 ROUTER 1: GET / (Lấy danh sách cuối cùng)**

**Mô tả:**
- Lấy tin nhắn cuối cùng của mỗi user mà user hiện tại nhắn tin hoặc user khác nhắn cho user hiện tại
- Dùng để hiển thị danh sách chat (tương tự Facebook Messenger)

**Lệnh test:**
```
Method: GET
URL: http://localhost:3000/api/v1/messages
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:** 
Không có

**Response mong đợi (Status 200):**
```json
[
  {
    "user": {
      "_id": "60d5ec49f1b2c72c1a123456",
      "username": "user2",
      "email": "user2@gmail.com",
      "fullName": "User Number 2",
      "avatarUrl": "https://i.sstatic.net/l60Hf.png"
    },
    "lastMessage": {
      "_id": "6606abc123def456",
      "from": {
        "_id": "60d5ec49f1b2c72c1a123450",
        "username": "user1",
        "email": "user1@gmail.com",
        "fullName": "User Number 1",
        "avatarUrl": "https://i.sstatic.net/l60Hf.png"
      },
      "to": {
        "_id": "60d5ec49f1b2c72c1a123456",
        "username": "user2",
        "email": "user2@gmail.com",
        "fullName": "User Number 2",
        "avatarUrl": "https://i.sstatic.net/l60Hf.png"
      },
      "messageContent": {
        "type": "text",
        "text": "Xin chào bạn!"
      },
      "createdAt": "2026-04-02T10:30:00.000Z",
      "updatedAt": "2026-04-02T10:30:00.000Z"
    }
  }
]
```

**Cách chụp:**
1. Click nút Preview hoặc Pretty để response rõ
2. Chụp toàn bộ màn hình Postman
3. Hiển thị: URL, Headers, Response

---

### **📌 ROUTER 2: POST / (Gửi tin nhắn TEXT)**

**Mô tả:**
- Gửi tin nhắn text cho user khác
- `to: userID` = ID của người nhận
- `messageContent.type = "text"`
- `messageContent.text` = nội dung tin nhắn

**Lệnh test:**
```
Method: POST
URL: http://localhost:3000/api/v1/messages
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Body (chọn "raw" → "JSON"):**
```json
{
  "to": "60d5ec49f1b2c72c1a123456",
  "messageContent": {
    "type": "text",
    "text": "Xin chào! Đây là tin nhắn test từ API"
  }
}
```

**Giải thích:**
- `to`: ID của người nhận (lấy từ danh sách users)
- `type`: "text" (vì gửi text)
- `text`: nội dung tin nhắn muốn gửi

**Response mong đợi (Status 200):**
```json
{
  "_id": "6606abc123def457",
  "from": {
    "_id": "60d5ec49f1b2c72c1a123450",
    "username": "user1",
    "email": "user1@gmail.com",
    "fullName": "User Number 1",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png"
  },
  "to": {
    "_id": "60d5ec49f1b2c72c1a123456",
    "username": "user2",
    "email": "user2@gmail.com",
    "fullName": "User Number 2",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png"
  },
  "messageContent": {
    "type": "text",
    "text": "Xin chào! Đây là tin nhắn test từ API"
  },
  "createdAt": "2026-04-02T10:35:00.000Z",
  "updatedAt": "2026-04-02T10:35:00.000Z"
}
```

**Cách chụp:**
1. Chụp toàn bộ request (URL + Headers + Body)
2. Chụp toàn bộ response
3. Đảm bảo có Status 200

---

### **📌 ROUTER 3: POST / (Gửi tin nhắn FILE)**

**Mô tả:**
- Gửi tin nhắn có file (hoặc link file)
- `to: userID` = ID của người nhận
- `messageContent.type = "file"`
- `messageContent.text` = đường dẫn file (ví dụ: /uploads/document.pdf)

**Lệnh test:**
```
Method: POST
URL: http://localhost:3000/api/v1/messages
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Body (chọn "raw" → "JSON"):**
```json
{
  "to": "60d5ec49f1b2c72c1a123456",
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  }
}
```

**Giải thích:**
- `to`: ID của người nhận
- `type`: "file" (vì gửi file)
- `text`: đường dẫn file (có thể là /uploads/abc.pdf, /uploads/image.jpg, v.v.)

**Response mong đợi (Status 200):**
```json
{
  "_id": "6606abc123def458",
  "from": {
    "_id": "60d5ec49f1b2c72c1a123450",
    "username": "user1",
    "email": "user1@gmail.com",
    "fullName": "User Number 1",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png"
  },
  "to": {
    "_id": "60d5ec49f1b2c72c1a123456",
    "username": "user2",
    "email": "user2@gmail.com",
    "fullName": "User Number 2",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png"
  },
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  },
  "createdAt": "2026-04-02T10:40:00.000Z",
  "updatedAt": "2026-04-02T10:40:00.000Z"
}
```

**Cách chụp:**
1. Chụp request (URL + Headers + Body)
2. Chụp response
3. Nhấn vào "file" trong messageContent.type để thấy rõ

---

### **📌 ROUTER 4: GET /:userID (Lấy toàn bộ tin nhắn)**

**Mô tả:**
- Lấy toàn bộ tin nhắn giữa user hiện tại và 1 user khác
- `:userID` = ID của user muốn xem cuộc chat
- Trả về tất cả tin nhắn (from và to), sắp xếp theo thời gian

**Lệnh test:**
```
Method: GET
URL: http://localhost:3000/api/v1/messages/60d5ec49f1b2c72c1a123456
(Thay 60d5ec49f1b2c72c1a123456 bằng userID thực tế)
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:** 
Không có

**Response mong đợi (Status 200):**
```json
[
  {
    "_id": "6606abc123def450",
    "from": {
      "_id": "60d5ec49f1b2c72c1a123450",
      "username": "user1",
      "email": "user1@gmail.com",
      "fullName": "User Number 1",
      "avatarUrl": "https://i.sstatic.net/l60Hf.png"
    },
    "to": {
      "_id": "60d5ec49f1b2c72c1a123456",
      "username": "user2",
      "email": "user2@gmail.com",
      "fullName": "User Number 2",
      "avatarUrl": "https://i.sstatic.net/l60Hf.png"
    },
    "messageContent": {
      "type": "text",
      "text": "Hello!"
    },
    "createdAt": "2026-04-02T10:00:00.000Z",
    "updatedAt": "2026-04-02T10:00:00.000Z"
  },
  {
    "_id": "6606abc123def451",
    "from": {
      "_id": "60d5ec49f1b2c72c1a123456",
      "username": "user2",
      "email": "user2@gmail.com",
      "fullName": "User Number 2",
      "avatarUrl": "https://i.sstatic.net/l60Hf.png"
    },
    "to": {
      "_id": "60d5ec49f1b2c72c1a123450",
      "username": "user1",
      "email": "user1@gmail.com",
      "fullName": "User Number 1",
      "avatarUrl": "https://i.sstatic.net/l60Hf.png"
    },
    "messageContent": {
      "type": "text",
      "text": "Hi! How are you?"
    },
    "createdAt": "2026-04-02T10:05:00.000Z",
    "updatedAt": "2026-04-02T10:05:00.000Z"
  }
]
```

**Cách chụp:**
1. Chụp URL rõ ràng (hiển thị userID)
2. Chụp Headers (Authorization)
3. Chụp toàn bộ response array

---

## **PHẦN 3: CÁCH LẤY userID**

### **Cách 1: Từ GET /api/v1/users**
```
GET http://localhost:3000/api/v1/users
Authorization: Bearer YOUR_TOKEN
```

Response:
```json
[
  {
    "_id": "60d5ec49f1b2c72c1a123450",
    "username": "user1",
    ...
  },
  {
    "_id": "60d5ec49f1b2c72c1a123456",
    "username": "user2",
    ...
  }
]
```

**Sao chép `_id` để dùng cho router 2, 3, 4**

### **Cách 2: Từ Response Login**
Khi login, response có:
```json
{
  "_id": "60d5ec49f1b2c72c1a123450",
  "username": "user1",
  ...
}
```

Sao chép từ đây để dùng

---

## **PHẦN 4: STEP-BY-STEP CHỤP ẢNH**

### **Step 1: Chuẩn bị Postman**
1. Mở Postman
2. Tạo Collection mới: "Messaging API"
3. Tạo 4 request:
   - GET / (Messages List)
   - POST / Text (Send Text)
   - POST / File (Send File)
   - GET /:userID (Message History)

### **Step 2: Chụp Router 1 (GET /)**
```
1. Click request "GET /"
2. Kiểm tra URL, Headers, Body
3. Click "Send"
4. Chụp toàn màn hình Postman (từ URL đến Response)
5. Lưu ảnh: router1_get_messages_list.png
```

### **Step 3: Chụp Router 2 (POST Text)**
```
1. Click request "POST / Text"
2. Vào tab "Body" → kiểm tra JSON
3. Tab "Headers" → kiểm tra Authorization
4. Click "Send"
5. Chụp: Body + Response
6. Lưu ảnh: router2_post_text_message.png
```

### **Step 4: Chụp Router 3 (POST File)**
```
1. Click request "POST / File"
2. Vào tab "Body" → kiểm tra JSON (type: "file")
3. Tab "Headers" → kiểm tra Authorization
4. Click "Send"
5. Chụp: Body + Response
6. Lưu ảnh: router3_post_file_message.png
```

### **Step 5: Chụp Router 4 (GET /:userID)**
```
1. Click request "GET /:userID"
2. Kiểm tra URL có userID
3. Tab "Headers" → kiểm tra Authorization
4. Click "Send"
5. Chụp: URL + Response (toàn bộ message history)
6. Lưu ảnh: router4_get_message_history.png
```

---

## **PHẦN 5: SUBMIT GIT**

### **Step 1: Mở Terminal**
```powershell
cd d:\Downloads\NNPTUD-C5-26-3
```

### **Step 2: Kiểm tra Status**
```powershell
git status
```

### **Step 3: Add Files**
```powershell
git add .
```

### **Step 4: Commit**
```powershell
git commit -m "Add messaging API: GET /, POST /, GET /:userID for text and file messages"
```

### **Step 5: Xem Log**
```powershell
git log --oneline
```

**Chụp ảnh kết quả:**
- Lưu ảnh: git_commit.png
- Lưu ảnh: git_log.png

---

## **PHẦN 6: TẠO FILE WORD**

### **Cấu trúc Document:**

```
TIÊU ĐỀ: MESSAGING API - POSTMAN TESTING DOCUMENTATION

1. GIỚI THIỆU (1 trang)
   - Mô tả 3 router
   - Mục đích của mỗi router

2. ROUTER 1: GET /api/v1/messages
   - Mô tả: Lấy danh sách tin nhắn cuối cùng
   - [CHỤP ẢNH]
   - Giải thích response

3. ROUTER 2: POST /api/v1/messages (Text)
   - Mô tả: Gửi tin nhắn text
   - [CHỤP ẢNH] 
   - Giải thích body + response

4. ROUTER 3: POST /api/v1/messages (File)
   - Mô tả: Gửi tin nhắn file
   - [CHỤP ẢNH]
   - Giải thích body + response

5. ROUTER 4: GET /api/v1/messages/:userID
   - Mô tả: Lấy toàn bộ tin nhắn
   - [CHỤP ẢNH]
   - Giải thích response

6. GIT COMMIT
   - [CHỤP ẢNH] git commit
   - [CHỤP ẢNH] git log

7. KẾT LUẬN
   - Tóm tắt chức năng
```

---

## **DANH SÁCH ẢNH CẦN CHỤP**

- [ ] router1_get_messages_list.png
- [ ] router2_post_text_message.png
- [ ] router3_post_file_message.png
- [ ] router4_get_message_history.png
- [ ] git_commit.png
- [ ] git_log.png

**Total: 6 ảnh chính**

---

## **LƯỚI KIỂM TRA**

✅ Tất cả request có token?
✅ Tất cả response có status 200?
✅ Body JSON có đúng format?
✅ URL có userID hợp lệ?
✅ File ảnh rõ ràng, không cắt ngoài?
✅ Có file Word với tất cả ảnh?
✅ Git commit đã được push?

---

**Sau khi hoàn thành → Nộp Word + Git! 🎉**
