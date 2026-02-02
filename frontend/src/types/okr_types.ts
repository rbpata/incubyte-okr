export type KeyResult = {
    id: number;
    description: string;
    progress: string;
};

export type Okr = {
    id: string;
    objective: string;
    keyResults: KeyResult[];
};
