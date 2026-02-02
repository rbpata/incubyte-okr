import express, { type Router } from 'express';
import { healthController } from '../Controllers/health-controller.js';
import { HealthService } from '../Service/health-service.js';

const app = express();
const router = express.Router();


let createHealthRoute;
export default createHealthRoute = (healthController:healthController):Router => {
   router.get('/', (req, res) => healthController.getHealthStatus(req, res));
   return router;
}