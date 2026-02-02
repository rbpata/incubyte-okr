import express from 'express';
import cors from 'cors';
import createOkrRoute from './Routes/okr.routes.js';
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use("/okrs",createOkrRoute());



app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
})