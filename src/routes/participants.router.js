import { Router } from 'express';
import ParticipantManager from '../dao/manager/ParticipantManager.js'
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();
const participantManager = new ParticipantManager();

const GMAIL_PASS = process.env.GMAIL_PASS

const GMAIL_USER = process.env.GMAIL_USER

// Configurar el transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

router.post('/register', async (req, res) => {
    try {
        const newParticipant = req.body
        const emailParticipant = newParticipant.email
        const exist = await participantManager.getParticipant({email:emailParticipant})
        if (exist) {
            res.status(400).send({
                status: 'failure',
                message: "Can't upload the participant!"
            })
        } else {
            const mailOptions = {
                from: GMAIL_USER,
                to: newParticipant.email,
                subject: 'Inscripción Audición DOUBLE K 2024 - Último paso',
                text: `Hola ${newParticipant.first_name},\n\n¡Te falta solo un paso para completar tu inscripción!\n\nMuchas gracias por completar el formulario! Por favor, a continuación adjunta a este mail la pista que vas a utilizar para la audición. Recordá que esta debe durar entre 30 segundos y 1 minuto. Se permiten ediciones de audio, breaks, intros y remixes mientras que se ajusten a la duración permitida. La canción puede ser de cualquier estilo o género musical. Te dejamos algunas reglas generales a continuación.\n\nFormato de Audio\nLos audios pueden ser en mp3 o wav. (Recomendamos mp3 para poder ajustarse al peso de archivo permitido por gmail)\n\nErrores de Audio\nEn caso de haber errores de formato o reproducción en el audio nos contactaremos a través de este mail para solicitar el audio correcto.\n\nCambio de Audio\nUna vez enviado el audio seleccionado no puede modificarse. Sin excepciones.\n\nNombre de Audio\nLos audios deben contener el nombre de la canción, grupo y nombre del participante. Ejemplo: "SClass Stray Kids - Juan Peréz"\n\nLímite de envío\nLos archivos de audio se reciben hasta el Jueves 25/04 a las 23:59hs. Recordá que el envío de audio es el último paso para completar la inscripción, por lo tanto si se envía los datos pero no la pista de audio, su inscripción quedará incompleta.\n\nDía de la audición\nEl día de la audición se probará unos segundos del audio antes de comenzar su presentación para asegurar su buena reproducción y volumen. Nosotros nos encargamos de llevar los audios el día de la audición pero recomendamos tenerla a disposición en su celular o pendrive en caso de algún inconveniente.\n\nUna vez envíado tu audio, te responderemos confirmando tu inscripción y la dirección de la audición.\n\nDesde ya muchas gracias por formar parte de este último año con nosotros!\nDOUBLE K`
            };
            
            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error al enviar el correo electrónico');
                } else {
                  console.log('Correo electrónico enviado: ' + info.response);
                  res.status(200).send('Correo electrónico enviado exitosamente');
                }
              });
            const participant = await participantManager.createParticipant(newParticipant); 
            res.status(200).send({
                status: 'success',
                message: 'Participant added!',
                payload: participant
            })
        }
    } catch (error) {
        console.log(error);
    }
})




export default router;