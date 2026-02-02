export type KeyResult = {
    id: string|number;
    description: string;
    progress: string|number;
};

export type Okr = {
    id: string;
    objective: string;
    keyResults: KeyResult[];
};

export const okrList: Okr[] = [
    {
        id: "1",
        objective: "Learn React",
        keyResults: [
            { id: 1, description: "Understand JSX and rendering", progress: 80 },
            { id: 2, description: "Build reusable components", progress: 70 },
            { id: 3, description: "Master React Hooks", progress: 60 },
            { id: 4, description: "Handle state management", progress: 55 },
            { id: 5, description: "Optimize component performance", progress: 40 }
        ]
    },
    {
        id: "2",
        objective: "Master TypeScript",
        keyResults: [
            { id: 6, description: "Learn basic and advanced types", progress: 90 },
            { id: 7, description: "Use generics effectively", progress: 65 },
            { id: 8, description: "Type React components properly", progress: 75 },
            { id: 9, description: "Avoid any and unknown misuse", progress: 60 },
            { id: 10, description: "Create reusable type utilities", progress: 45 }
        ]
    }];