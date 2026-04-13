type Props = {
    titleFilter: string;
    codeFilter: string;
    onlyDeficitFilter: boolean;
};

type Emits = {
    emitTitleFilter: (value: string) => void;
    emitCodeFilter: (value: string) => void;
    emitOnlyDeficitFilter: (value: boolean) => void;
};

export const useWarehouseFilters = (props: Props, emits: Emits) => {
    const titleFilterModel = computed({
        get: () => props.titleFilter,
        set: (value: string) => {
            emits.emitTitleFilter(value);
        },
    });

    const codeFilterModel = computed({
        get: () => props.codeFilter,
        set: (value: string) => {
            emits.emitCodeFilter(value);
        },
    });

    const onlyDeficitFilterModel = computed({
        get: () => props.onlyDeficitFilter,
        set: (value: boolean) => {
            emits.emitOnlyDeficitFilter(value);
        },
    });

    return {
        titleFilterModel,
        codeFilterModel,
        onlyDeficitFilterModel,
    };
};

export default useWarehouseFilters;
