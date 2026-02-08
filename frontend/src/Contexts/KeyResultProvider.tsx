import type { KeyResult } from '../Types/okr_types.ts';
import React, { type JSX } from 'react';
import { KeyResultContext } from './KeyResultContext.tsx';

const KeyResultProvider = ({ children }: { children: JSX.Element }) => {
   const [keyResultList, setKeyResultList] = React.useState<KeyResult[]>([]);

   const addKeyResult = ({
      description,
      progress,
   }: {
      description: string;
      progress: string;
   }) => {
      if (
         description.length > 5 &&
         Number(progress) <= 100 &&
         Number(progress) >= 0
      ) {
         setKeyResultList((prev) => [
            ...prev,
            {
               id: Date.now(), // Use number instead of string
               description,
               progress: progress,
            },
         ]);
      } else {
         alert(
            'Key Result description must be longer than 5 characters and progress must be between 0 and 100.'
         );
      }
   };

   const updateKeyResult = (id: number, updatedKeyResult: KeyResult) => {
      setKeyResultList((prev) =>
         prev.map((kr) => (kr.id === id ? updatedKeyResult : kr))
      );
   };

   const removeKeyResult = (id: number) => {
      setKeyResultList((prev) => prev.filter((kr) => kr.id !== id));
   };

   const clearKeyResults = () => {
      setKeyResultList([]);
   };

   const setKeyResults = (keyResults: KeyResult[]) => {
      setKeyResultList(keyResults);
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
