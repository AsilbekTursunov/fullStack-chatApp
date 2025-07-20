import { IUser } from '@/types'
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
// host: 'smtp.gmail.com',
// port: 587,
export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'asilbekt84@gmail.com',
		pass: 'zzckezpmmtibdgge',
	},
})
// secure: false,
export function mailOptions(sender: IUser, recipent: IUser) {
	return {
		from: sender.email, // sender address
		to: recipent.email, // Subject line
		html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Friend Request</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .card {
        max-width: 500px;
        margin: 40px auto;
        background: #ffffff;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid #e5e7eb;
      }
      .card h2 {
        font-size: 24px;
        font-weight: bold;
        color: #16a34a;
        text-align: center;
        margin-bottom: 16px;
      }
      .card p {
        color: #374151;
        text-align: center;
        margin: 0;
        font-size: 16px;
      }
      .profile {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content:start;
        margin-top: 24px;
      }
      .profile img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
      .profile-info p {
        margin: 2px 0;
      }
      .profile-info .name {
        font-size: 18px;
        font-weight: 500;
        text-align:start;
      }
      .profile-info .languages {
        font-size: 14px;
        color: #6b7280;
      }
      .btn-container {
        text-align: center;
        margin-top: 24px;
      }
      .btn-container a {
        display: inline-block;
        background-color: #16a34a;
        color: white;
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      .btn-container a:hover {
        background-color: #15803d;
        margin-bottom:10px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>New Friend Request</h2>

      <p><strong>${sender.fullName}</strong> has sent you a friend request on <strong>Chatty</strong>.</p>

      <div class="profile">
        <img
          src="${sender.profilePic}"
          alt="${sender.fullName}"
        />
        <div class="profile-info">
          <p class="name">${sender.fullName}</p>
          <p class="languages">Native: ${sender.nativeLanguage} | Learning: ${sender.learningLanguage}</p>
        </div>
      </div>

      <div class="btn-container">
        <a href="https://chatty-stream-app.vercel.app/dashboard/notifications">
          Accept Request
        </a>
      </div>

      <p class="footer">
        You received this message because you're registered on Chatty.
      </p>
    </div>
  </body>
</html>

  `,
	}
}

export const emailOTP = (code: string, recipentEmail: string) => {
	return {
		from: 'asilbekt84@gmail.com', // sender address
		to: recipentEmail, // Subject line
		html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verify Your Email - Chattyl</title>
          <style>
            body {
              background-color: #f4f4f4;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              background-color: #ffffff;
              margin: 30px auto;
              padding: 30px; 
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
              display:flex; 
              justify-content:center;
              align-items:center;
              gap:5px;
            }
            .logo img {
              width: 100px;
            }
            .logo .name{
              font-size:44px;
              font-weight:900;
              color:#2c3e50;
            }
            h3 {
              color: #2c3e50;
              text-align: center;
            }
            p {
              color: #555555;
              font-size: 16px;
              line-height: 1.5;
            }
            .button {
              display: block;
              width: fit-content;
              margin: 30px auto;
              padding: 12px 24px;
              background-color: #7777;
              color: #000;
              text-decoration: none;
              font-weight: bold;
              font-size:32px;
              border-radius: 6px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #999999;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="https://chatty-stream-app.vercel.app/chatty.png" alt="Chattyl Logo" />
              <span class="name">Chatty</span>
            </div>
            <p>Hi there,</p>
            <p>Thanks for joining <strong>Chattyl</strong>! Please confirm your email address by enter the number  below:</p>
            
            <span class="button">${code}</span>

            <p>If you didn’t sign up for Chattyl, you can safely ignore this email.</p>

            <div class="footer">
              &copy; 2025 Chattyl. All rights reserved.<br />
              You received this email because you signed up on Chattyl.
            </div>
          </div>
        </body>
      </html>

    `,
	}
}
