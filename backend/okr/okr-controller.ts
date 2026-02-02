import type OkrService from "./okr-service.js";

class OkrController{
    constructor(private readonly okrService:OkrService) {}
    getOkrList(req:any,res:any){
        const response=this.okrService.getOkrList();
        return res.send(response);
    }
    createOkr(req:any,res:any){
        const response=this.okrService.createOkr(req.body);
        return res.send(response);
    }
}
export default OkrController;