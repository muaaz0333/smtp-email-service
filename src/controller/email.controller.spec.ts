import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from '../service/email.service';
import { EmailDto } from '../dto/email.dto';

describe('EmailController', () => {
  let controller: EmailController;
  let emailService: EmailService;

  beforeEach(async () => {
    emailService = {
      sendEmail: jest.fn(),
    } as unknown as EmailService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailService,
          useValue: emailService,
        },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call EmailService.sendEmail with correct payload', async () => {
      const emailDto: EmailDto = {
        _id: '66d5725e370e39eb1a683937',
        email: 'muaazahmad001@gmail.com',
      };

      await controller.sendEmail(emailDto);

      expect(emailService.sendEmail).toHaveBeenCalledWith(emailDto);
    });
  });
});
