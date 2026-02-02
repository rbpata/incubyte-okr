import { OkrService } from '../Service/okr.services.js';
import type { Request, Response } from 'express';
import * as e from 'cors';


export class OkrController {
   constructor(okrService: OkrService) {
   }

   getAllOkrs(req: Request, res: Response) {
      return res.json(OkrService.getAll());
   }
    createOkr(req: Request, res: Response) {
      const okr = req.body;
      const createdOkr = OkrService.createOkr(okr);
      return res.status(201).json(createdOkr);
   }

   getOkrById(req: Request, res: Response) {
      const id: string = String(req.params.id);
      const okr = OkrService.getOkrById(id);
      if (okr) {
         return res.json(okr);
      } else {
         return res.status(404).json({ message: 'OKR not found' });
      }
   }

    updateOkr(req: Request, res: Response) {

      const id: string = String(req.params.id);
      const updatedOkrData = req.body;
      const updatedOkr = OkrService.updateOkr(id, updatedOkrData);
      if (updatedOkr) {
         return res.json(updatedOkr);
      } else {
         return res.status(404).json({ message: 'OKR not found' });
      }
   }

    deleteOkr(req: Request, res: Response) {
      const id : string = String(req.params.id);
      const deleted = OkrService.deleteOkr(id);
      if (deleted) {
         return res.status(204).send();
      } else {
         return res.status(404).json({ message: 'OKR not found' });
      }
   }
}

