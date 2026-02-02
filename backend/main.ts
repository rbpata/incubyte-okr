import express from 'express';
import cors from 'cors';
import { healthController } from './Controllers/health-controller.js';
import { HealthService } from './Service/health-service.js';
import createHealthRoute from './Routes/health-route.js';
const app = express();
const port = 3000;


app.use(cors());

const healthService = new HealthService();
const healthCtrl = new healthController(healthService);


app.use("/health",createHealthRoute(healthCtrl));

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
})