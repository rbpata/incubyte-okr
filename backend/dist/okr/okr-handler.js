import express from "express";
const okrHandler = (okrController) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        okrController.getOkrList(req, res);
    });
    router.post('/', (req, res) => {
        okrController.createOkr(req, res);
    });
    return router;
};
export default okrHandler;
//# sourceMappingURL=okr-handler.js.map