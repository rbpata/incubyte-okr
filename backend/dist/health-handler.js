import HealthController from "./health-controller.js";
import express from "express";
const createHealthRouteHandler = (healthController) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        healthController.checkHealth(req, res);
    });
    return router;
};
export default createHealthRouteHandler;
//# sourceMappingURL=health-handler.js.map