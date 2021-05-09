import handler from "../../../libs/handler-lib";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

export const main = handler(async (event, context) => {
  const { crush_name, crush_email, content } = event.body;

  const filePath = path.resolve("../../src/resources/email_to_send.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    crush_name,
    content,
  };
  const htmlToSend = template(replacements);

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

  const emailSent = await transporter.sendMail({
    from: "Cupido Online <cupido.online.bgc@gmail.com>",
    to: crush_email,
    subject: "Nova Mensagem para você",
    text: "Uma mensagem anônima para você!",
    html: htmlToSend,
  });

  return emailSent.messageId;
});
