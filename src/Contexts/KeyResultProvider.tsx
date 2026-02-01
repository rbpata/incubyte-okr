import type { KeyResult } from '../Types/okr_types.ts';
import React, { type JSX } from 'react';
import { KeyResultContext } from './KeyResultContext.tsx';

const KeyResultProvider = ({ children }: { children: JSX.Element }) => {
   const [keyResultList, setKeyResultList] = React.useState<KeyResult[]>([]);
   const addKeyResult = ({ description, progress }: KeyResult) => {
      if (
         description.length > 5 &&
         Number(progress) <= 100 &&
         Number(progress) >= 0
      ) {
         setKeyResultList((prev) => [
            ...prev,
            { id: crypto.randomUUID(), description, progress },
         ]);
      } else {
         alert(
            'Key Result description must be longer than 5 characters and progress must be between 0 and 100.'
         );
      }
   };

   const clearKeyResults = () => {
      setKeyResultList([]);
   };

   const outSource = {
      keyResultList,
      addKeyResult,
      clearKeyResults,
   };

   return (
      <KeyResultContext.Provider value={outSource}>
         {children}
      </KeyResultContext.Provider>
   );
};
export default KeyResultProvider;
