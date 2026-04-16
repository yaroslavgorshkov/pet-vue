import type {
    Employee,
    EmployeesFiltersSortTabsValues,
    EmployeeSortingDirectionValue,
    MonthlyWorkLog,
} from '~~/shared/task9/types';

const useEmployeePage = () => {
    const {
        data: employees,
        error: errorE,
        pending: pendingE,
        refresh: refreshE,
    } = useFetch<Employee[]>('/api/employees');

    const {
        data: worklogs,
        error: errorW,
        pending: pendingW,
        refresh: refreshW,
    } = useFetch<MonthlyWorkLog[]>('/api/employees');

    const route = useRoute();
    const queryParams = computed(() => route.query);
    const router = useRouter();

    const fullNameFilter = computed({
        get: () => queryParams.value.fullName ?? undefined,
        set: (value: string) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    fullName: value === '' ? undefined : value,
                },
            });
        },
    });
    const departmentFilter = computed({
        get: () => queryParams.value.department ?? undefined,
        set: (value: string) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    department: value === '' ? undefined : value,
                },
            });
        },
    });
    const emailFilter = computed({
        get: () => queryParams.value.email ?? undefined,
        set: (value: string) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    email: value === '' ? undefined : value,
                },
            });
        },
    });
    const positionFilter = computed({
        get: () => queryParams.value.position ?? undefined,
        set: (value: string) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    position: value === '' ? undefined : value,
                },
            });
        },
    });
    const onlyOvertimeFilter = computed({
        get: () => queryParams.value.overtime ?? undefined,
        set: (value: boolean) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    overtime: value ? 'true' : undefined,
                },
            });
        },
    });

    const sortingValueFilter = computed({
        get: () => queryParams.value.sort ?? undefined,
        set: (value: EmployeesFiltersSortTabsValues) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    sort: value ?? 'name',
                },
            });
        },
    });
    const sortingDirectionFilter = computed({
        get: () => queryParams.value.direction ?? undefined,
        set: (value: EmployeeSortingDirectionValue) => {
            router.replace({
                query: {
                    ...queryParams.value,
                    direction: value ?? 'ascending',
                },
            });
        },
    });

    onMounted(() => {
        router.replace({
            query: {
                ...queryParams.value,
                sort: sortingValueFilter.value ?? 'name',
                direction: sortingDirectionFilter.value ?? 'ascending',
            },
        });
    });

    const filteredEmployeesList = computed(() => {
        if (employees.value === undefined) {
            return undefined;
        }
        let filtered = employees.value
            .filter((e) =>
                e.fullName
                    .toLowerCase()
                    .includes(
                        fullNameFilter.value === undefined
                            ? ''
                            : fullNameFilter.value.toString().toLowerCase()
                    )
            )
            .filter((e) =>
                e.department
                    .toLowerCase()
                    .includes(
                        departmentFilter.value === undefined
                            ? ''
                            : departmentFilter.value.toString().toLowerCase()
                    )
            )
            .filter((e) =>
                e.email
                    .toLowerCase()
                    .includes(
                        emailFilter.value === undefined
                            ? ''
                            : emailFilter.value.toString().toLowerCase()
                    )
            )
            .filter((e) =>
                e.position
                    .toLowerCase()
                    .includes(
                        positionFilter.value === undefined
                            ? ''
                            : positionFilter.value.toString().toLowerCase()
                    )
            );
        if (onlyOvertimeFilter.value === 'true') {
            filtered = filtered.filter((e) => e.isOvertime);
        }
        if (sortingDirectionFilter.value === 'ascending') {
            filtered.sort((e1, e2) =>
                sortingValueFilter.value === 'name'
                    ? e1.fullName.localeCompare(e2.fullName)
                    : sortingValueFilter.value === 'department'
                      ? e1.department.localeCompare(e2.department)
                      : sortingValueFilter.value === 'email'
                        ? e1.email.localeCompare(e2.email)
                        : e1.position.localeCompare(e2.position)
            );
        } else {
            filtered.sort((e2, e1) =>
                sortingValueFilter.value === 'name'
                    ? e1.fullName.localeCompare(e2.fullName)
                    : sortingValueFilter.value === 'department'
                      ? e1.department.localeCompare(e2.department)
                      : sortingValueFilter.value === 'email'
                        ? e1.email.localeCompare(e2.email)
                        : e1.position.localeCompare(e2.position)
            );
        }

        return filtered;
    });
};

export default useEmployeePage;
