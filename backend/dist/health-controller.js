import HealthService from "./health-service.js";
class HealthController {
    healthService1;
    constructor(healthService1) {
        this.healthService1 = healthService1;
    }
    checkHealth(req, res) {
        const response = this.healthService1.checkHealth();
        return res.send(response);
    }
}
export default HealthController;
//# sourceMappingURL=health-controller.js.map