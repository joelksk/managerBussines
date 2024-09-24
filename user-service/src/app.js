import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const isTest = process.env.NODE_ENV === 'test';


mongoose.connect(isTest ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI).then(() => {
    if(isTest){
        console.log("Conected to **MongoDB TEST**")
    }else{
        console.log("Conected to MongoDB");
        
    }
}).catch(err => {
    console.error('Error to conect MongoDB:', err);
});


app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorMiddleware); 


const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


export {app, server}