export type KeyResult = {
   id: string;
   description: string;
   progress: string;
};

export type OkrType = {
   id: string;
   objective: string;
   keyResults: KeyResult[];
};
