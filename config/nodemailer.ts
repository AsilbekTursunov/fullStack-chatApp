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
