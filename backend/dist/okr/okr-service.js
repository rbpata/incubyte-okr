import { okrList } from "../data.js";
class OkrService {
    okrList1;
    constructor() {
        this.okrList1 = okrList;
    }
    getOkrList() {
        return this.okrList1;
    }
    createOkr(okr) {
        okr = { ...okr, id: (Math.floor(Math.random() * (1000))).toString(10) };
        okr.keyResults = okr.keyResults.map((keyResult) => ({
            ...keyResult,
            id: (Math.floor(Math.random() * (1000))).toString(10)
        }));
        this.okrList1 = [...okrList, okr];
        return this.okrList1;
    }
}
export default OkrService;
//# sourceMappingURL=okr-service.js.map