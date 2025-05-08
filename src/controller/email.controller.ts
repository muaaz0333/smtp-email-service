import { Controller } from '@nestjs/common';
import { EmailService } from '../service/email.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailDto } from '../dto/email.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('new-user')
  async sendEmail(@Payload() emailDto: EmailDto) {
    console.log('event received: ', JSON.stringify(emailDto));
    return this.emailService.sendEmail(emailDto);
  }
}
