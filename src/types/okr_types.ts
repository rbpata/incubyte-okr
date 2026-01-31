export type KeyResult = {
    id: number;
    description: string;
    progress: number;
};

export type Okr = {
    id: string;
    objective: string;
    keyResults: KeyResult[];
};
