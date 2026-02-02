import { HealthService } from '../Service/health-service.js';

export class healthController {
   constructor(healthService: HealthService) {
      this.healthService = healthService;
   }

   private healthService: HealthService | undefined;
      public getHealthStatus(req: any, res: any): void {
      const status = this.healthService?.checkHealth();
      res.send(status);
      }
}
