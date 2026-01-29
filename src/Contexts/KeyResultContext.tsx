import {createContext} from "react";
import type {KeyResult} from "../Types/okr_types.ts";

type KeyResultContextType = {
    keyResultList: KeyResult[];
    addKeyResult?: ({description, progress}: KeyResult) => void;
};

export const KeyResultContext = createContext<KeyResultContextType>({
    keyResultList: [],
    addKeyResult: () => {
    }
});
