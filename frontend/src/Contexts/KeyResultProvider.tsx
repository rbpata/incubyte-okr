import { KeyResultContext } from './KeyResultContext.tsx';
import React from 'react';
import type { KeyResult } from '../Types/okr_types.ts';

const KeyResultProvider = ({ children }: { children: React.ReactNode }) => {
   const [keyResultList, setKeyResultList] = React.useState<KeyResult[]>([]);

   const addKeyResult = ({
                            description,
                            progress,
                         }: {
      description: string;
      progress: string;
   }) => {
      const numericProgress = Number(progress);
      const isValidProgress =
         Number.isFinite(numericProgress) &&
         numericProgress >=0 &&
         numericProgress <=100;

      if (description.trim().length >5 && isValidProgress) {
         setKeyResultList((prev) => [
            ...prev,
            {
               id: Date.now(),
               description: description.trim(),
               progress: numericProgress.toString(),
            },
         ]);
      } else {
         alert(
            'Key Result description must be longer than5 characters and progress must be between0 and100.'
         );
      }
   };

   const updateKeyResult = (id: number, updatedKeyResult: KeyResult) => {
      setKeyResultList((prev) =>
         prev.map((kr) =>
            kr.id === id ? {
                  ...updatedKeyResult,
                  progress: Number(updatedKeyResult.progress).toString(),
                  description: updatedKeyResult.description.trim(),
               }
               : kr )
      );
   };

   const removeKeyResult = (id: number) => {
      setKeyResultList((prev) => prev.filter((kr) => kr.id !== id));
   };

   const clearKeyResults = () => {
      setKeyResultList([]);
   };

   const setKeyResults = (keyResults: KeyResult[]) => {
      setKeyResultList(
         keyResults.map((kr) => ({
            ...kr,
            progress: Number(kr.progress).toString(),
            description: kr.description.trim(),
         }))
      );
   };

   const outSource = {
      keyResultList,
      addKeyResult,
      updateKeyResult,
      removeKeyResult,
      clearKeyResults,
      setKeyResults,
   };

   return (
      <KeyResultContext.Provider value={outSource}>
         {children}
      </KeyResultContext.Provider>
   );
};

export default KeyResultProvider;
