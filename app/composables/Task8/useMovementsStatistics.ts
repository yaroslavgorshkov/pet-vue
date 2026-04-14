import type { MonthlyMovement } from '~~/shared/task8/types';

type Props = {
    movement: MonthlyMovement[] | undefined;
};

const useMovementsStatistics = (props: Props) => {
    const totalIncoming = computed(() =>
        props.movement?.reduce((acc, m) => acc + m.incoming, 0)
    );
    const totalOutgoing = computed(() =>
        props.movement?.reduce((acc, m) => acc + m.outgoing, 0)
    );

    return {
        totalIncoming,
        totalOutgoing,
    };
};

export default useMovementsStatistics;
