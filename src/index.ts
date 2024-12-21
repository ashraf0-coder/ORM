import express from 'express';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute';
import postRoute from './Routes/postRoute';
import commentRoute from './Routes/commentRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use('/users', userRoute)
app.use('/posts', postRoute)
app.use('/comments', commentRoute)

app.listen(PORT, () => console.log(`Server on port ${PORT}`));