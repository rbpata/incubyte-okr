import type { OkrType } from '../Types/okr_types.js';
import { okrs } from '../data/okrs.db.js';


export class OkrService {

   static getAll() {
      return okrs;
   }

   static createOkr(okr: OkrType) {
      okrs.push(okr);
      return okr;
   }

   static getOkrById(id: string): OkrType | undefined {
      return okrs.find(okr => okr.id === id);
   }

   static updateOkr(id: string, updatedOkr: Partial<OkrType>): OkrType | undefined {

            const okrIndex: number = okrs.findIndex(okr => okr.id === id);
            if (okrIndex !== -1) {
               const merged = { ...okrs[okrIndex], ...updatedOkr } as OkrType;
               okrs[okrIndex] = merged;
               return merged;
            }
            return undefined;

      }
   static deleteOkr(id: string): boolean {
      const okrIndex = okrs.findIndex(okr => okr.id === id);
      if (okrIndex !== -1) {
         okrs.splice(okrIndex, 1);
         return true;
      }
      return false;
   }

}