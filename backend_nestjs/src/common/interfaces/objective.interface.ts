import { KeyResult } from './key-result.interface';

export interface Objective {
    id: string;
    title: string;
    isCompleted: boolean;
    keyResults: KeyResult[];
}
