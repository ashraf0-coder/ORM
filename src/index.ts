import express from 'express';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute';
import postRoute from './Routes/userRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use('/users', userRoute)
app.use('/posts', postRoute)

app.listen(PORT, () => console.log(`Server on port ${PORT}`));