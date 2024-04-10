import { Router } from 'express';
import ParticipantManager from '../dao/manager/ParticipantManager.js'

const router = Router();
const participantManager = new ParticipantManager();

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