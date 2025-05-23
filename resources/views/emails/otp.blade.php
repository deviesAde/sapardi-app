<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eeeeee;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .otp-container {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
       .otp-code {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 5px;
    color: #2c3e50;
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    display: inline-block;
}
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #7f8c8d;
            border-top: 1px solid #eeeeee;
        }
        .warning {
            background-color: #fff8e1;
            padding: 12px;
            border-radius: 4px;
            font-size: 14px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Replace with your logo -->
            <img src="{{ asset('images/landing/logo.png') }}" alt="Company Logo" class="logo">
            <h1>Email Verification</h1>
        </div>

        <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering with us. To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>

            <div class="otp-container">
                <p>Your verification code is:</p>
               <div class="otp-code" style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #2c3e50; padding: 10px 20px; background-color: #ffffff; border: 1px solid #cccccc; display: inline-block;">
    {{ $otp }}
</div>
                <p style="margin-top: 10px;">This code is valid for <strong>10 minutes</strong> only.</p>
            </div>

            <div class="warning">
                <p><strong>Important:</strong> Never share this code with anyone, including our customer support team. We will never ask you for your verification code.</p>
            </div>

            <p>If you didn't request this code, you can safely ignore this email or contact our support team if you have any concerns.</p>

            <p>Best regards,<br>Your Company Team</p>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Your Company Name. All rights reserved.</p>
            <p>If you're having trouble with the button above, copy and paste the OTP code directly.</p>
        </div>
    </div>
</body>
</html>
