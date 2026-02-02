import express, { type Router } from 'express';
import {OkrController} from '../Controllers/okr.controller.js';
import type { Request , Response} from 'express';
import { OkrService } from '../Service/okr.services.js';

let okrService =  new OkrService();
let okrController =  new OkrController(okrService);

export default function createOkrRoute():Router {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) =>{
         return okrController.getAllOkrs(req, res)
    });
    router.post('/', (req, res) => {
         return okrController.createOkr(req, res)
    });
    router.get('/:id', (req, res) => {
         return okrController.getOkrById(req, res)
    });
    router.put('/:id', (req, res) => {
         return okrController.updateOkr(req, res)
    });
    router.delete('/:id', (req, res) => {
         return okrController.deleteOkr(req, res)
    });

    return router;
}