import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma/client'; // Importas tu Prisma generado

// Instancias el cliente
const prisma = new PrismaClient();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true, // Bloquea el login de usuarios no verificados
        // Lógica para enviar el email de verificación
        // Aquí deberás importar y utilizar tu servicio real de envío de correos (Nodemailer, Resend, etc.)
    },
    // Le pasas la instancia de Prisma al adaptador
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
});