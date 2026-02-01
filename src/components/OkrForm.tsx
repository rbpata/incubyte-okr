import React, { useContext } from 'react';
import KeyResultList from './KeyResultList.tsx';
import KeyResultListForm from './KeyResultListForm.tsx';
import { KeyResultContext } from '../Contexts/KeyResultContext.tsx';
import type { OkrType } from '../Types/okr_types.ts';

export default function OkrForm() {
   const { keyResultList, clearKeyResults } = useContext(KeyResultContext);

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(e.currentTarget);
      const objective = formData.get('objective') as string;

      if (!objective || keyResultList.length === 0) {
         alert('Objective and at least one Key Result are required');
         return;
      }

      const newOkr: OkrType = {
         id: crypto.randomUUID(),
         objective,
         keyResults: keyResultList,
      };

      try {
         const res = await fetch('http://localhost:3001/okrs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOkr),
         });

         if (!res.ok) throw new Error('Failed to create OKR');

         alert('OKR created successfully');

         form.reset();
         clearKeyResults();
      } catch (error) {
         console.error(error);
         alert('Something went wrong while saving OKR');
      }
   };

   return (
      <div className="p-6">
         <form onSubmit={handleSubmit} className="space-y-5">
            <h1 className="text-2xl font-semibold text-gray-800 text-center pb-2 border-b border-gray-100">
               Create OKR
            </h1>

            <div className="flex flex-col gap-1.5">
               <label
                  htmlFor="objective-input"
                  className="text-sm font-medium text-gray-600"
               >
                  Objective
               </label>
               <input
                  type="text"
                  id="objective-input"
                  name="objective"
                  placeholder="Increase product adoption by Q4"
                  required
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
               />
            </div>

            <div className="pt-2">
               <KeyResultListForm />
               <KeyResultList />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
               <button
                  type="reset"
                  className="px-5 py-2 rounded-lg font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  onClick={() => {
                     clearKeyResults();
                  }}
               >
                  Clear
               </button>
               <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
               >
                  Submit
               </button>
            </div>
         </form>
      </div>
   );
}
