import type { KeyResult } from '../Types/okr_types.ts';
import React, { createContext, type JSX } from 'react';

type KeyResultContextType = {
   keyResultList: KeyResult[];
   setKeyResultList: React.Dispatch<React.SetStateAction<KeyResult[]>>;
};

export const KeyResultContext = createContext<KeyResultContextType>({
   keyResultList: [],
   setKeyResultList: () => {},
});

const KeyResultProvider = ({ children }: { children: JSX.Element }) => {
   const [keyResultList, setKeyResultList] = React.useState<KeyResult[]>([]);
   const outSource = {
      keyResultList,
      setKeyResultList,
   };
   return (
      <KeyResultContext.Provider value={outSource}>
         {children}
      </KeyResultContext.Provider>
   );
};

export default KeyResultProvider;
