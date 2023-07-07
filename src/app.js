import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import * as dotenv from 'dotenv';

import viewsRouter from './routes/views.router.js';
import participantsRouter from './routes/participants.router.js'
import __dirname from './utils.js';

dotenv.config();

const app = express();

const PASSWORD = process.env.PASSWORD

mongoose.connect(`mongodb+srv://marcosfvizio:${PASSWORD}@cluster0.vdd5ngb.mongodb.net/doublek?retryWrites=true&w=majority`)

app.listen(8080, ()=> console.log('Server running on port 8080'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/api/participants', participantsRouter)
app.use('/', viewsRouter)