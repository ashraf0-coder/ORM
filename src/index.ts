import express from 'express';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute'
dotenv.config();

const app =express();
const PORT = process.env.PORT;

app.use('/users', userRoute)

app.listen(PORT, () => console.log(`Server on port ${PORT}`));