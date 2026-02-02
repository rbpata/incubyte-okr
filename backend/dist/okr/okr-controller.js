class OkrController {
    okrService;
    constructor(okrService) {
        this.okrService = okrService;
    }
    getOkrList(req, res) {
        const response = this.okrService.getOkrList();
        return res.send(response);
    }
    createOkr(req, res) {
        console.log(req.body);
        const response = this.okrService.createOkr(req.body);
        return res.send(response);
    }
}
export default OkrController;
//# sourceMappingURL=okr-controller.js.map