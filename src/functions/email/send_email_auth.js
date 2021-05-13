import handler from "../../../libs/handler-lib";
import nodemailer from "nodemailer";

export const main = handler(async (event, context) => {
  const { crush_name, crush_email, content, id } =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cupido.online.bgc@gmail.com",
      pass: "cupido@online",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const htmlToSend = `
  <html>
    <body style="color: black; background-color: #f6f9f6">
      <center style="background-color: #f6f9f6; padding: 30px 0">
        <div style="
              background-color: white;
              width: fit-content;
            ">
          <div style="
                background-color: #d75b79;
                color: white;
                padding: 15px;
              ">
            <span style="font-size: 30px; font-weight: bold">
              Cupido Online
            </span>
          </div>
          <div style="padding: 10px 30px 30px 30px">
            <p style="font-size: 18px">
              Olá <strong>${crush_name}</strong>, um passarinho me disse que...
            </p>
            <div style="
                  background-color: whitesmoke;
                  width: fit-content;
                  text-align: left;
                  padding: 10px;
                  border-radius: 10px;
                  max-width: 600px;
                ">
              <span style="font-size: 1rem">${content}</span>
            </div>
            <br />
            <a href="https://cupido-online.vercel.app/messages/${id}/match/${true}" style="
                  margin-bottom: 10px;
                  padding: 8px 24px;
                  background-color: #d75b79;
                  text-decoration: none;
                  font-size: 20px;
                  font-weight: bold;
                  border-radius: 5px;
                  color: white;
                ">Dar Match</a>
            <br />
            <br />
            <span style="font-size: 16px;">
              Essa mensagem foi enviada a você pelo serviço
              <strong>Cupido Online.</strong>
            </span>
            <br />
            <span style="font-size: 14px;">Por favor não responda a este e-mail.</span>
          </div>
        </div>
      </center>
    </body>
  </html>
  `;

  const emailSent = await transporter.sendMail({
    from: "Cupido Online <cupido.online.bgc@gmail.com>",
    to: crush_email,
    subject: "Nova Mensagem para você",
    text: "Uma mensagem anônima para você!",
    html: htmlToSend,
  });

  return emailSent.messageId;
});
