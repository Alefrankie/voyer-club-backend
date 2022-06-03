import * as nodemailer from 'nodemailer';

const MyEMAIL = "dorsi.programacion@gmail.com"
const MyPASSWORD = "*pr0gr4m4c10n*"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MyEMAIL,
      pass: MyPASSWORD
    },
});

export const recovery = async (email: string, newPassword: string) => {
    await transporter.sendMail({
    from: MyEMAIL,
    to: email,
    subject: "Recuperacion de Contraseña", //Titulo
    html: `<h1>Contraseña Actualizada!</h1> <p> ${newPassword} </p>`
  });
}
