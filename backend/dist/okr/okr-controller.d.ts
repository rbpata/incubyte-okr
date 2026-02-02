import type OkrService from "./okr-service.js";
declare class OkrController {
    private readonly okrService;
    constructor(okrService: OkrService);
    getOkrList(req: any, res: any): any;
    createOkr(req: any, res: any): any;
}
export default OkrController;
//# sourceMappingURL=okr-controller.d.ts.map