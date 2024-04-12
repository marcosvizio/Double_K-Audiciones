import { Router } from 'express';
import ParticipantManager from '../dao/manager/ParticipantManager.js'

const router = Router();

const participantManager = new ParticipantManager();

router.get('/', (req,res)=>{
    try {
        res.status(200).render('home', {
            css: 'home',
            title: "Double K' || Audiciones"
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/finish', (req, res)=>{
    try {
        res.status(200).render('finish', {
            css: 'home',
            title: "Double K' || Audiciones"
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/8nYs3qA9xR', async (req,res)=>{
    try {
        const participants = await participantManager.getParticipants();
        console.log(participants);
        res.status(200).render('participants', {
            css: 'home',
            title: "Double K' || Audiciones",
            participants: participants
        })
    } catch (error) {
        console.log(error);
    }
})

export default router