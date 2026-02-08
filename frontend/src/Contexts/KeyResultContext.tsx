import { createContext } from 'react';
import type { KeyResult } from '../Types/okr_types.ts';

type KeyResultContextType = {
   keyResultList: KeyResult[];
   addKeyResult?: ({
      description,
      progress,
   }: {
      description: string;
      progress: string;
   }) => void;
   updateKeyResult?: (id: number, updatedKeyResult: KeyResult) => void;
   removeKeyResult?: (id: number) => void;
   clearKeyResults: () => void;
   setKeyResults: (keyResults: KeyResult[]) => void;
};

export const KeyResultContext = createContext<KeyResultContextType>({
   keyResultList: [],
   addKeyResult: () => {},
   updateKeyResult: () => {},
   removeKeyResult: () => {},
   clearKeyResults: () => {},
   setKeyResults: () => {},
});
