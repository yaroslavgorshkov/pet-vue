export type Warehouse = {
    id: number;
    title: string;
    code: string;
    manager: string;
    city: string;
    isInDeficit: boolean;
};

export type MonthlyMovement = {
    id: number;
    warehouseId: number;
    month: string;
    incoming: number;
    outgoing: number;
};

export type FormResponse = {
    isSucceed: boolean;
    message: string;
}
