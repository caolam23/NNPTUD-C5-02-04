# NHANH GỌNLỆNH CHẠY & TEST POSTMAN

---

## **BƯỚC 1: Chạy Server**

```powershell
npm start
```

**Kết quả:** Thấy `connected` ✅

---

## **BƯỚC 2: Lấy Token (POST Login)**

```
Method: POST
URL: http://localhost:3000/api/v1/auth/login
Body:
{
  "username": "your_username",
  "password": "your_password"
}
```

**Sao chép:** token từ response

---

## **BƯỚC 3: Lấy userID của người nhận**

```
Method: GET
URL: http://localhost:3000/api/v1/users
Headers: Authorization: Bearer [TOKEN]
```

**Sao chép:** `_id` của user khác

---

## **BƯỚC 4: Test 4 Router**

### **Router 1: GET / (Danh sách chat)**
```
GET http://localhost:3000/api/v1/messages
Authorization: Bearer [TOKEN]
```
**Chụp:** Toàn bộ response ✅

---

### **Router 2: POST / (Gửi text)**
```
POST http://localhost:3000/api/v1/messages
Headers:
  Authorization: Bearer [TOKEN]
  Content-Type: application/json

Body:
{
  "to": "[USER_ID]",
  "messageContent": {
    "type": "text",
    "text": "Hello!"
  }
}
```
**Chụp:** Body + Response ✅

---

### **Router 3: POST / (Gửi file)**
```
POST http://localhost:3000/api/v1/messages
Headers:
  Authorization: Bearer [TOKEN]
  Content-Type: application/json

Body:
{
  "to": "[USER_ID]",
  "messageContent": {
    "type": "file",
    "text": "/uploads/document.pdf"
  }
}
```
**Chụp:** Body + Response ✅

---

### **Router 4: GET /:userID (Lịch sử)**
```
GET http://localhost:3000/api/v1/messages/[USER_ID]
Authorization: Bearer [TOKEN]
```
**Chụp:** URL + Response ✅

---

## **BƯỚC 5: Git Commit**

```powershell
cd d:\Downloads\NNPTUD-C5-26-3

git status
git add .
git commit -m "Add messaging API - 3 routers"
git log --oneline
```

**Chụp:** Terminal output ✅

---

## **BƯỚC 6: Tạo Word Report**

1. Tạo file Word
2. Dán 6 ảnh Postman vào (4 router + 2 git)
3. Thêm giải thích cho mỗi ảnh
4. Lưu: `MESSAGING_API_REPORT.docx`

---

## **Danh Sách Ảnh (6 ảnh)**

1. ✅ Router 1 GET / 
2. ✅ Router 2 POST text
3. ✅ Router 3 POST file
4. ✅ Router 4 GET /:userID
5. ✅ Git commit
6. ✅ Git log

---

**Nộp:** Word + Git repo ✅
