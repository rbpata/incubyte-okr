import HealthService from "./health-service.js";
declare class HealthController {
    private readonly healthService1;
    constructor(healthService1: HealthService);
    checkHealth(req: any, res: any): any;
}
export default HealthController;
//# sourceMappingURL=health-controller.d.ts.map