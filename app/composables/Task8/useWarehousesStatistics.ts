import type { MonthlyMovement, Warehouse } from '~~/shared/task8/types';

type Props = {
    warehouses: Warehouse[] | undefined;
    movements: MonthlyMovement[] | undefined;
};

const useWarehousesStatistics = (props: Props) => {
    const totalWarehouses = computed(() => props.warehouses?.length);
    const deficitWarehouses = computed(
        () => props.warehouses?.filter((w) => w.isInDeficit).length
    );
    const totalIncoming = computed(() =>
        props.movements?.reduce((acc, m) => acc + m.incoming, 0)
    );
    const totalOutgoing = computed(() =>
        props.movements?.reduce((acc, m) => acc + m.outgoing, 0)
    );

    return {
        totalWarehouses,
        deficitWarehouses,
        totalIncoming,
        totalOutgoing,
    };
};

export default useWarehousesStatistics;
