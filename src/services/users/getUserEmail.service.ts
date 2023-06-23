import { createTransport } from 'nodemailer'
import { IEmailRequest } from '../../interfaces/email.interface';
import 'dotenv/config'
import { AppDataSource } from '../../data-source';
import { IUserRepo } from '../../interfaces/user.interface';
import { UserCreateRequestSchema } from '../../schemas/users.schemas';
import { User } from '../../entities';
import { randomUUID } from 'crypto';
import Mailgen from 'mailgen';
import AppError from '../../errors/appError';

const sendEmailService = async(to: string): Promise<any> => {

    const transporter = createTransport({
        host: "smtp.gmail.com",
       // port: 587,
       // secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    const userRepository: IUserRepo = AppDataSource.getRepository(User)
      
    const user = await userRepository.findOne({
        where:{
            email:to
        }
    })

    if(!user){
        throw new AppError("user not found", 404)
    }

    const resetToken = randomUUID()

    const email = {
        body: {
            name: user?.name,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: `http://localhost:3000/resetPassword/${resetToken}`
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };

    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'M6 T14',
            link: 'http://localhost:3000'        
           
        }
    });

 const generate = mailGenerator.generate(email)

   const sendEmail = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: "reset password",
        html: generate
    })

    if(sendEmail){
        return {"message": "Email enviado com sucesso!"}
    }else{
        throw new AppError("Erro ao enviar email!",400)
    }
    

}

export default sendEmailService