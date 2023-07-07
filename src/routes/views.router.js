import { Router } from 'express';

const router = Router();

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

export default router