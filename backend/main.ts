import express from "express";
import cors from "cors";
import HealthService from "./health/health-service.js";
import HealthController from "./health/health-controller.js";
import createHealthRouteHandler from "./health/health-handler.js";
import OkrService from "./okr/okr-service.js";
import OkrController from "./okr/okr-controller.js";
import okrHandler from "./okr/okr-handler.js";

const app = express();
const port = 3000

app.use(cors());
app.use(express.json());

const healthService = new HealthService();
const healthController = new HealthController(healthService);

const okrService = new OkrService();
const okrController = new OkrController(okrService);
app.use(
    "/okr",
    okrHandler(okrController)
)

app.use(
    "/health",
    createHealthRouteHandler(healthController)
)

app.listen(port, () => {
    console.log("Server listening on port " + port)
})