
import HealthService from "./health-service.js";

class HealthController {
    constructor(private readonly healthService1: HealthService) {

    }

    checkHealth(req:any, res:any){
        const response=this.healthService1.checkHealth()
        return res.send(response);
    }
}
export default HealthController;