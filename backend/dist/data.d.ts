export type KeyResult = {
    id: string | number;
    description: string;
    progress: string | number;
};
export type Okr = {
    id: string;
    objective: string;
    keyResults: KeyResult[];
};
export declare const okrList: Okr[];
//# sourceMappingURL=data.d.ts.map