# 📧 Email Service (NestJS + SMTP + RabbitMQ)

This microservice is responsible for sending emails when a new student is created. It listens to messages from the `student_email` queue via RabbitMQ and dispatches emails using SMTP through Nodemailer.

---

## 🔧 Tech Stack

- 🚀 [NestJS](https://nestjs.com/) — Progressive Node.js Framework
- 📬 [Nodemailer](https://nodemailer.com/about/) — SMTP Email Sending
- 🐇 [RabbitMQ](https://www.rabbitmq.com/) — Message Broker for Microservices

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/muaaz0333/smtp-email-service.git
cd smtp-email-service
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment
#### Create a .env file based on .env.example:
```bash
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
SMTP_HOST=smtp.yourmail.com
SMTP_PORT=587
STUDENT_API_URL=http://localhost
RMQ_URL=amqp://localhost
```

### 4️⃣ Run the app
```bash
npm start
```

## 📬 RabbitMQ
#### Make sure RabbitMQ is running before starting this service. You can spin up a RabbitMQ instance using 
#### Docker:
```bash
docker run -d --hostname rabbitmq-host --name rabbitmq \
  -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```



## 🙌 Follow the Author

Made with ❤️ by **Muaaz Ahmad**  
👨‍💻 GitHub: [@muaaz0333](https://github.com/muaaz0333)  
🔗 LinkedIn: [linkedin.com/in/MuaazAhmad](https://www.linkedin.com/in/expertfullstackdeveloper/)

