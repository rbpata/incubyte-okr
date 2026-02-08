export type KeyResult = {
   id: number;
   description: string;
   progress: string;
};

export type OkrType = {
   id: number;
   title: string;
   keyResults: KeyResult[];
};
