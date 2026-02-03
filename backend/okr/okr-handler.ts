import type OkrController from "./okr-controller.js";
import express from "express";

const okrHandler=(okrController:OkrController)=>{
    const router=express.Router();
    router.get('/',(req,res)=>{
        okrController.getOkrList(req,res);
    });
    router.post('/',(req,res)=>{
        okrController.createOkr(req,res);
    });
    router.delete(('/:id'),(req,res) => {
        okrController.deleteOkr(req,res);
    })
    router.put('/:id', (req,res)=>{
        okrController.updateOkr(req,res);
    })
    return router
}
export default okrHandler;