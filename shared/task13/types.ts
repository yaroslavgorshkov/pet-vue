export type Team = {
    id: number;
    title: string;
    code: string;
    lead: string;
    description: string;
    isBehindPlan: boolean;
};

export type MonthlyReport = {
    id: number;
    teamId: number;
    month: string;
    plannedTasks: number;
    completedTasks: number;
};

export type SortValues = 'title' | 'code' | 'lead' | 'description';
export type SortDirection = 'ascending' | 'descending';

export type SortValuesItem = {
    id: number;
    label: string;
    value: SortValues;
};

export type SortDirectionItem = {
    id: number;
    label: string;
    value: SortDirection;
};

export type TabsList = {
    id: number;
    label: string;
    value: string;
}[];

export type Response = {
    isSucceed: boolean;
    message: string;
};
