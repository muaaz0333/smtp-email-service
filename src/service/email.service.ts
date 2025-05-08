import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailDto } from '../dto/email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT'), 10),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  sendEmail(emailDto: EmailDto) {
    const mailOptions = {
      from: this.configService.get('SMTP_USER'),
      to: emailDto.email,
      subject: 'Welcome To Microservice Mailing Architecture',
      html: `
        <p>Dear ${emailDto.name} Your ID is: ${emailDto._id}!</p>

        <p>Thank you for joining <strong>your organization</strong>! To get started, please verify your email address by clicking the link below:</p>

        <p style={{marginTop:"8", marginBottom:"8"}><a href="https://muaaz1.netlify.app/" style="color: #ffffff; background-color: #ff5722; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify My Email</a></p>

        <p>By verifying your email, you will gain access to our community-driven platform where you can:</p>
        <ul>
          <li>Learn and Grow</li>
          <li>Upvote other people's choices that you also love.</li>
        </ul>

        <p>We can't wait to have you on board. If you didn't sign up for Code Graphers, please ignore this email.</p>

        <p>Cheers!</p>

        <p><strong>Regards,</strong></p>
        <p>Muaaz Ahmad</p>
<!--        <p><a href="https://muaaz1.netlify.app/" style="color: #2b6cba; padding: 10px 20px; text-decoration: none; border-radius: 5px;"></a></p>-->
<!--        <img src="img.png" alt="img">-->
        <p><img src="cid:logo" alt="img" style="max-width: 100px;"></p>
`,

      attachments: [
        {
          filename: 'img.png',
          path: './src/img.png',
          cid: 'logo',
        },
      ],

      // text: `Hello, your ID is ${emailDto._id}. Welcome to the team!`,
    };

    this.transporter.sendMail(mailOptions);
  }
}
