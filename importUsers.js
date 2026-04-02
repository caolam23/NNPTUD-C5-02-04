const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const userModel = require('./schemas/users');
const roleModel = require('./schemas/roles');
const { sendMailWithPassword } = require('./utils/mailHandler');

// Hàm tạo random password 16 ký tự
function generateRandomPassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Hàm hash mật khẩu
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Hàm import users
async function importUsers() {
  try {
    // Kết nối MongoDB
    await mongoose.connect('mongodb://localhost:27017/NNPTUD-C5');
    console.log('✓ Kết nối MongoDB thành công');

    // Đọc file data-import.json
    const filePath = path.join(__dirname, 'data-import.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`✓ Đã đọc ${data.length} người dùng từ file`);

    // Tìm role "user"
    let userRole = await roleModel.findOne({ name: 'user' });
    if (!userRole) {
      console.log('⚠ Không tìm thấy role "user", đang tạo...');
      userRole = await roleModel.create({
        name: 'user',
        description: 'Regular user role'
      });
      console.log('✓ Đã tạo role "user"');
    }

    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    // Import từng user
    for (const userData of data) {
      try {
        // Kiểm tra username đã tồn tại
        const existingUser = await userModel.findOne({ 
          username: userData.username, 
          isDeleted: false 
        });
        
        if (existingUser) {
          results.failed++;
          results.errors.push(`Username "${userData.username}" đã tồn tại`);
          console.log(`✗ Username "${userData.username}" đã tồn tại`);
          continue;
        }

        // Kiểm tra email đã tồn tại
        const existingEmail = await userModel.findOne({ 
          email: userData.email, 
          isDeleted: false 
        });
        
        if (existingEmail) {
          results.failed++;
          results.errors.push(`Email "${userData.email}" đã tồn tại`);
          console.log(`✗ Email "${userData.email}" đã tồn tại`);
          continue;
        }

        // Tạo random password
        const plainPassword = generateRandomPassword(16);
        const hashedPassword = await hashPassword(plainPassword);

        // Tạo user
        const newUser = new userModel({
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          role: userRole._id,
          fullName: userData.fullName || '',
          status: false,
          loginCount: 0
        });

        await newUser.save();
        results.success++;

        // Gửi email password
        await sendMailWithPassword(
          userData.email,
          userData.username,
          plainPassword
        );

        console.log(`✓ Đã tạo user: ${userData.username} (${userData.email})`);
      } catch (error) {
        results.failed++;
        results.errors.push(`Lỗi tạo user "${userData.username}": ${error.message}`);
        console.log(`✗ Lỗi tạo user "${userData.username}":`, error.message);
      }
    }

    // In kết quả
    console.log('\n========== KẾT QUẢ IMPORT ==========');
    console.log(`Thành công: ${results.success}`);
    console.log(`Thất bại: ${results.failed}`);
    
    if (results.errors.length > 0) {
      console.log('\nLỗi chi tiết:');
      results.errors.forEach(err => console.log(`  - ${err}`));
    }

    // Lưu log vào file
    const logContent = {
      timestamp: new Date().toISOString(),
      summary: {
        total: data.length,
        success: results.success,
        failed: results.failed
      },
      errors: results.errors
    };

    fs.writeFileSync(
      path.join(__dirname, 'import-log.json'),
      JSON.stringify(logContent, null, 2)
    );
    console.log('\n✓ Log đã được lưu vào import-log.json');

    await mongoose.disconnect();
    console.log('✓ Ngắt kết nối MongoDB');
  } catch (error) {
    console.error('✗ Lỗi:', error.message);
    process.exit(1);
  }
}

// Chạy script
importUsers();
