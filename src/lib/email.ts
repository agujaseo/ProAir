import nodemailer from 'nodemailer';
import type { DeliveryNote, User } from '@prisma/client';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendDeliveryNoteNotification(deliveryNote: DeliveryNote, admins: User[]) {
  const adminEmails = admins
    .filter(user => ['developer', 'admin'].includes(user.role))
    .map(user => user.email);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: adminEmails.join(', '),
    subject: `Nuevo Albarán Creado - ${deliveryNote.id}`,
    html: `
      <h1>Nuevo Albarán Creado</h1>
      <p>Se ha creado un nuevo albarán con ID: ${deliveryNote.id}</p>
      <p>Estado: ${deliveryNote.status}</p>
      <p>Ruta: ${deliveryNote.routeNumber}</p>
      <p>D.D.: ${deliveryNote.ddNumber}</p>
    `,
  });
}

export async function sendTrialExpirationAlert(deliveryNote: DeliveryNote, client: any, admins: User[]) {
  const adminEmails = admins
    .filter(user => ['developer', 'admin'].includes(user.role))
    .map(user => user.email);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: [...adminEmails, client.email].join(', '),
    subject: `Alerta: Prueba por Expirar - ${client.commercialName}`,
    html: `
      <h1>Alerta de Expiración de Prueba</h1>
      <p>La prueba para ${client.commercialName} está por expirar.</p>
      <p>Albarán ID: ${deliveryNote.id}</p>
      <p>Fecha de instalación: ${new Date(deliveryNote.date).toLocaleDateString()}</p>
    `,
  });
}
