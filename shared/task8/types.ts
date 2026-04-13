type Warehouse = {
    id: number;
    title: string;
    code: string;
    manager: string;
    city: string;
    isInDeficit: boolean;
};

type MonthlyMovement = {
    id: number;
    warehouseId: number;
    month: string;
    incoming: number;
    outgoing: number;
};
