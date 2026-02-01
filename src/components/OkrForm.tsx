import React, { useContext, useEffect, useState } from 'react';
import KeyResultList from './KeyResultList';
import KeyResultListForm from './KeyResultListForm';
import { KeyResultContext } from '../Contexts/KeyResultContext';
import type { OkrType } from '../Types/okr_types';

const BASE_URL = 'http://localhost:3001';

interface OkrFormProps {
   initialOkr?: OkrType | null;
   onSave?: (okr: OkrType, isEdit: boolean) => void;
}

export default function OkrForm({ initialOkr, onSave }: OkrFormProps) {
   const isEditMode = Boolean(initialOkr);
   const { keyResultList, clearKeyResults } = useContext(KeyResultContext);

   const [objective, setObjective] = useState('');

   useEffect(() => {
      if (isEditMode && initialOkr) {
         setObjective(initialOkr.objective);
      }
   }, [isEditMode, initialOkr]);

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!objective || keyResultList.length === 0) {
         alert('Objective and at least one Key Result are required');
         return;
      }

      const okr: OkrType = {
         id: initialOkr?.id ?? crypto.randomUUID(),
         objective,
         keyResults: keyResultList,
      };

      try {
         const res = await fetch(
             isEditMode
                 ? `${BASE_URL}/okrs/${okr.id}`
                 : `${BASE_URL}/okrs`,
             {
                method: isEditMode ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(okr),
             }
         );

         if (!res.ok) throw new Error('Failed to save OKR');

         const savedOkr = await res.json();

         clearKeyResults();
         onSave?.(savedOkr, isEditMode);
      } catch (error) {
         console.error(error);
         alert('Something went wrong while saving OKR');
      }
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
