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

    const { data: worklogs, refresh: refreshW } =
        useFetch<MonthlyWorkLog[]>('/api/worklogs');

    const route = useRoute();
    const queryParams = computed(() => route.query);
    const router = useRouter();

    const fullNameFilter = ref('');
    const departmentFilter = ref('');
    const emailFilter = ref('');
    const positionFilter = ref('');
    const onlyOvertimeFilter = ref(false);

    const sortingValue = ref<EmployeesFiltersSortTabsValues>('name');
    const sortingType = ref<EmployeeSortingDirectionValue>('ascending');

    const filteredEmployeesList = computed(() => {
        if (employees.value === undefined) {
            return undefined;
        }
        let filtered = employees.value
            .filter((e) =>
                e.department
                    .toLowerCase()
                    .includes(departmentFilter.value.toLowerCase())
            )
            .filter((e) =>
                e.email.toLowerCase().includes(emailFilter.value.toLowerCase())
            )
            .filter((e) =>
                e.fullName
                    .toLowerCase()
                    .includes(fullNameFilter.value.toLowerCase())
            )
            .filter((e) =>
                e.position
                    .toLowerCase()
                    .includes(positionFilter.value.toLowerCase())
            );
        if (onlyOvertimeFilter.value) {
            filtered = filtered.filter((e) => e.isOvertime);
        }
        if (sortingType.value === 'ascending') {
            if (sortingValue.value === 'department') {
                filtered.sort((e1, e2) =>
                    e1.department.localeCompare(e2.department)
                );
            } else if (sortingValue.value === 'email') {
                filtered.sort((e1, e2) => e1.email.localeCompare(e2.email));
            } else if (sortingValue.value === 'name') {
                filtered.sort((e1, e2) =>
                    e1.fullName.localeCompare(e2.fullName)
                );
            } else {
                filtered.sort((e1, e2) =>
                    e1.position.localeCompare(e2.position)
                );
            }
        } else {
            if (sortingValue.value === 'department') {
                filtered.sort((e1, e2) =>
                    e2.department.localeCompare(e1.department)
                );
            } else if (sortingValue.value === 'email') {
                filtered.sort((e1, e2) => e2.email.localeCompare(e1.email));
            } else if (sortingValue.value === 'name') {
                filtered.sort((e1, e2) =>
                    e2.fullName.localeCompare(e1.fullName)
                );
            } else {
                filtered.sort((e1, e2) =>
                    e2.position.localeCompare(e1.position)
                );
            }
        }

        return filtered;
    });

    watch(
        [
            fullNameFilter,
            departmentFilter,
            emailFilter,
            positionFilter,
            onlyOvertimeFilter,
            sortingValue,
            sortingType,
        ],
        ([
            fullNameFilterNew,
            departmentFilterNew,
            emailFilterNew,
            positionFilterNew,
            onlyOvertimeFilterNew,
            sortingValueNew,
            sortingTypeNew,
        ]) => {
            router.replace({
                query: {
                    name:
                        fullNameFilterNew !== ''
                            ? fullNameFilterNew
                            : undefined,
                    department:
                        departmentFilterNew !== ''
                            ? departmentFilterNew
                            : undefined,
                    email: emailFilterNew !== '' ? emailFilterNew : undefined,
                    position:
                        positionFilterNew !== ''
                            ? positionFilterNew
                            : undefined,
                    overtime: onlyOvertimeFilterNew ? 'true' : undefined,
                    sort: sortingValueNew,
                    direction: sortingTypeNew,
                },
            });
        }
    );

    onMounted(() => {
        if (queryParams.value.name === null || queryParams.value.name == null) {
            fullNameFilter.value = '';
        } else {
            fullNameFilter.value = String(queryParams.value.name);
        }

        if (
            queryParams.value.department === null ||
            queryParams.value.department == null
        ) {
            departmentFilter.value = '';
        } else {
            departmentFilter.value = String(queryParams.value.department);
        }

        if (
            queryParams.value.email === null ||
            queryParams.value.email == null
        ) {
            emailFilter.value = '';
        } else {
            emailFilter.value = String(queryParams.value.email);
        }

        if (
            queryParams.value.position === null ||
            queryParams.value.position == null
        ) {
            positionFilter.value = '';
        } else {
            positionFilter.value = String(queryParams.value.position);
        }

        if (
            queryParams.value.overtime === null ||
            queryParams.value.overtime == null
        ) {
            onlyOvertimeFilter.value = false;
        } else {
            onlyOvertimeFilter.value =
                queryParams.value.overtime === 'true' ? true : false;
        }

        if (queryParams.value.sort === null || queryParams.value.sort == null) {
            sortingValue.value = 'name';
        } else {
            sortingValue.value = queryParams.value
                .sort as EmployeesFiltersSortTabsValues;
        }

        if (
            queryParams.value.direction === null ||
            queryParams.value.direction == null
        ) {
            sortingType.value = 'ascending';
        } else {
            sortingType.value = queryParams.value
                .direction as EmployeeSortingDirectionValue;
        }
    });

    const recentWatchedEmployees = ref<Employee[]>([]);

    onMounted(() => {
        const recentWatchedEmployeesStr = localStorage.getItem(
            'recentWatchedEmployees'
        );
        if (recentWatchedEmployeesStr === null) {
            recentWatchedEmployees.value = [];
            return;
        }
        try {
            const recentWatchedEmployeesParsed = JSON.parse(
                recentWatchedEmployeesStr
            ) as Employee[];

            recentWatchedEmployees.value = recentWatchedEmployeesParsed;
        } catch {
            recentWatchedEmployees.value = [];
        }
    });

    return {
        fullNameFilter,
        departmentFilter,
        positionFilter,
        emailFilter,
        onlyOvertimeFilter,
        sortingValue,
        sortingType,
        recentWatchedEmployees,
        filteredEmployeesList,
        errorE,
        pendingE,
        worklogs,
        refreshE,
        refreshW,
    };
};

export default useEmployeePage;
