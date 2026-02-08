import React, { useContext, useEffect, useState } from 'react';
import KeyResultList from './KeyResultList';
import KeyResultListForm from './KeyResultListForm';
import { KeyResultContext } from '../Contexts/KeyResultContext';
import type { OkrType } from '../Types/okr_types';

const BASE_URL = 'http://localhost:3000';

interface OkrFormProps {
   initialOkr?: OkrType | null;
   onSave?: (okr: OkrType, isEdit: boolean) => void;
}

export default function OkrForm({ initialOkr, onSave }: OkrFormProps) {
   const isEditMode = Boolean(initialOkr);
   const { keyResultList, clearKeyResults, setKeyResults } =
      useContext(KeyResultContext);

   const [objective, setObjective] = useState('');

   useEffect(() => {
      if (isEditMode && initialOkr) {
         setObjective(initialOkr.title);
         setKeyResults(initialOkr.keyResults || []);
      } else {
         setObjective('');clearKeyResults();
      }
   }, [isEditMode, initialOkr, setKeyResults, clearKeyResults]);

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!objective || keyResultList.length === 0) {
         alert('Objective and at least one Key Result are required.');
         return;
      }

      try {
         const res = await fetch(
            isEditMode
               ? `${BASE_URL}/okr/objectives/${initialOkr?.id}`
               : `${BASE_URL}/okr/objectives`,
            {
               method: isEditMode ? 'PUT' : 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'secretkey',
               },
               body: JSON.stringify({
                  title: objective,
               }),
            }
         );

         if (!res.ok) {
            throw new Error(
               `Failed to ${isEditMode ? 'update' : 'create'} OKR`
            );
         }

         const savedObjective = await res.json();
         const objectiveId = savedObjective.id;

         if (isEditMode) {
            await updateKeyResults(objectiveId);
         } else {
            await saveKeyResults(objectiveId);
         }

         const updatedRes = await fetch(`${BASE_URL}/okr/objectives`, {
            headers: { Authorization: 'secretkey' }
         });
         const updatedObjectives = await updatedRes.json();
         const updatedOkr = updatedObjectives.find((obj: OkrType) => obj.id === objectiveId);

         clearKeyResults();
         onSave?.(updatedOkr, isEditMode);

      } catch (error) {
         console.error(error);
         alert(
            `Something went wrong while ${isEditMode ? 'updating' : 'creating'} OKR`
         );
      }
   };

   const saveKeyResults = async (objectiveId: number) => {
      return fetch(`${BASE_URL}/okr/objectives/${objectiveId}/key-results/`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'secretkey',
         },
         body: JSON.stringify(keyResultList),
      });
   };

   const updateKeyResults = async (objectiveId: number) => {
      const existingKRs = initialOkr?.keyResults || [];

      for (const kr of existingKRs) {
         await fetch(`${BASE_URL}/okr/objectives/${objectiveId}/key-results/${kr.id}`, {
            method: 'DELETE',
            headers: { Authorization: 'secretkey' }
         });
      }

      // Create new key results
      await saveKeyResults(objectiveId);
   };

   return (
      <div className="p-6">
         <form onSubmit={handleSubmit} className="space-y-5">
            <h1 className="text-3xl font-semibold text-gray-800 text-center pb-2 border-b border-gray-100">
               {isEditMode ? 'Update OKR' : 'Create OKR'}
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
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
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
                     setObjective('');
                     clearKeyResults();
                  }}
               >
                  Clear
               </button>
               <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
               >
                  {isEditMode ? 'Update' : 'Submit'}
               </button>
            </div>
         </form>
      </div>
   );
}
