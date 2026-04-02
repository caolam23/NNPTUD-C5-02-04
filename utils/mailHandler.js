const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.MAILTRAP_USER || "your_mailtrap_user",
        pass: process.env.MAILTRAP_PASS || "your_mailtrap_password",
    },
});

module.exports = {
    sendMail: async function (to, url) {
        const info = await transporter.sendMail({
            from: 'noreply@nnptud.com',
            to: to,
            subject: "Reset Password URL",
            text: "Click vao day de doi pass",
            html: "Click vao <a href=" + url + ">day</a> de doi pass",
        });

        console.log("Message sent:", info.messageId);
    },
    
    sendMailWithPassword: async function (to, username, password) {
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #007bff;
                        padding-bottom: 20px;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        color: #007bff;
                        margin: 0;
                    }
                    .content {
                        color: #333;
                        line-height: 1.6;
                    }
                    .credentials {
                        background-color: #f8f9fa;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        padding: 15px;
                        margin: 20px 0;
                        font-family: monospace;
                    }
                    .credentials p {
                        margin: 10px 0;
                    }
                    .label {
                        font-weight: bold;
                        color: #007bff;
                    }
                    .password {
                        background-color: #fff3cd;
                        padding: 2px 6px;
                        border-radius: 3px;
                        font-weight: bold;
                        letter-spacing: 1px;
                    }
                    .warning {
                        background-color: #f8d7da;
                        border: 1px solid #f5c6cb;
                        color: #721c24;
                        padding: 12px;
                        border-radius: 4px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        color: #666;
                        font-size: 12px;
                        margin-top: 30px;
                        border-top: 1px solid #ddd;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Tài khoản đã được tạo thành công</h1>
                    </div>
                    
                    <div class="content">
                        <p>Xin chào <strong>${username}</strong>,</p>
                        
                        <p>Chúng tôi rất vui khi chào đón bạn tới hệ thống của chúng tôi. Tài khoản của bạn đã được tạo thành công. Dưới đây là thôn tin đăng nhập của bạn:</p>
                        
                        <div class="credentials">
                            <p><span class="label">👤 Tên đăng nhập:</span> <strong>${username}</strong></p>
                            <p><span class="label">🔐 Mật khẩu:</span> <span class="password">${password}</span></p>
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ Quan trọng:</strong>
                            <ul>
                                <li>Vui lòng giữ bí mật mật khẩu của bạn</li>
                                <li>Khuyến cáo thay đổi mật khẩu lần đầu tiên khi đăng nhập</li>
                                <li>Không chia sẻ mật khẩu cho bất kỳ ai</li>
                            </ul>
                        </div>
                        
                        <p>Nếu bạn có bất kỳ câu hỏi hay cần hỗ trợ, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
                        
                        <p>Trân trọng,<br><strong>Đội ngũ hệ thống</strong></p>
                    </div>
                    
                    <div class="footer">
                        <p>Email này được gửi tự động. Vui lòng không trả lời email này.</p>
                        <p>&copy; 2026 NNPTUD. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const info = await transporter.sendMail({
            from: 'noreply@nnptud.com',
            to: to,
            subject: `Chào mừng ${username} - Thông tin tài khoản đăng nhập`,
            text: `Tên đăng nhập: ${username}\nMật khẩu: ${password}`,
            html: htmlContent,
        });

        console.log("✓ Email gửi tới", to, "- Message ID:", info.messageId);
        return info;
    }
}
