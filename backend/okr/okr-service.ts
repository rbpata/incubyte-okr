import type {Okr} from "./data.js";
import {okrList} from "./data.js";

class OkrService {
    private okrList1:Okr[];
    constructor() {
        this.okrList1=okrList;
    }

    getOkrList(){
        return this.okrList1;
    }

    createOkr(okr:Okr){
        okr={...okr,id:(Math.floor(Math.random()*(1000))).toString(10)};
        okr.keyResults=okr.keyResults.map((keyResult)=>({
            ...keyResult,
            id:(Math.floor(Math.random()*(1000))).toString(10)
        }));
        this.okrList1=[...this.okrList1,okr];
        return this.okrList1;
    }


}
export default OkrService;