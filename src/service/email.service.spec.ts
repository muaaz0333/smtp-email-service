import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailService', () => {
  let service: EmailService;
  let configService: ConfigService;
  let transporterMock;

  beforeEach(async () => {
    transporterMock = {
      sendMail: jest.fn(),
    };
    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'SMTP_HOST':
                  return 'smtp.mailtrap.io';
                case 'SMTP_PORT':
                  return '2525';
                case 'SMTP_USER':
                  return 'user';
                case 'SMTP_PASS':
                  return 'pass';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email with correct options', async () => {
    const emailDto = {
      _id: '66d5725e370e39eb1a683937',
      email: 'muaazahmad001@gmail.com',
    };

    await service.sendEmail(emailDto);

    expect(transporterMock.sendMail).toHaveBeenCalledWith({
      from: configService.get('SMTP_USER'),
      to: emailDto.email,
      subject: 'Welcome To Code Graphers',
      html: expect.stringContaining(
        `Dear Employee Your ID is: ${emailDto._id}`,
      ),
      attachments: [
        {
          filename: 'img.png',
          path: './src/img.png',
          cid: 'logo',
        },
      ],
    });
  });
});
