import type { Employee, MonthlyWorkLog } from '~~/shared/task9/types';

const useEmployeeWorklogsPage = () => {
    const route = useRoute();
    
    const employeeId = computed(() => route.params.employeeId ?? '');
    
    const {
        data: worklogs,
        error: errorW,
        pending: pendingW,
        refresh: refreshW,
    } = useFetch<MonthlyWorkLog[]>(
        `/api/employees/${employeeId.value}/worklogs`
    );

    const { data: employee, refresh: refreshE } = useFetch<Employee>(
        `/api/employees/${employeeId.value}`
    );

    onMounted(() => {
        watch(
            employee,
            (employeeNew) => {
                if (employeeId.value === '' || employeeNew === undefined) {
                    return;
                }
                let recentWatchedEmployeeList = localStorage.getItem(
                    'recentWatchedEmployees'
                );
                if (recentWatchedEmployeeList === null) {
                    localStorage.setItem(
                        'recentWatchedEmployees',
                        JSON.stringify([])
                    );
                    return;
                }
                try {
                    let recentWatchedEmployeeListParsed: Employee[] =
                        JSON.parse(recentWatchedEmployeeList);

                    const newEmployeeToRecentWatched: Employee = {
                        department: employeeNew.department,
                        email: employeeNew.email,
                        fullName: employeeNew.fullName,
                        id: Number(employeeId.value),
                        isOvertime: employeeNew.isOvertime,
                        position: employeeNew.position,
                    };

                    if (
                        recentWatchedEmployeeListParsed
                            .map((e) => e.id)
                            .includes(Number(employeeId.value))
                    ) {
                        recentWatchedEmployeeListParsed =
                            recentWatchedEmployeeListParsed.filter(
                                (e) => e.id !== Number(employeeId.value)
                            );
                        recentWatchedEmployeeListParsed.unshift(
                            newEmployeeToRecentWatched
                        );
                        
                    } else {
                        recentWatchedEmployeeListParsed.unshift(
                            newEmployeeToRecentWatched
                        );
                    }

                    localStorage.setItem(
                        'recentWatchedEmployees',
                        JSON.stringify(
                            recentWatchedEmployeeListParsed.slice(0, 5)
                        )
                    );
                } catch {
                    localStorage.setItem(
                        'recentWatchedEmployees',
                        JSON.stringify([])
                    );
                }
            },
            { immediate: true }
        );
    });

    return {
        worklogs,
        errorW,
        pendingW,
        refreshW,
        employee,
        refreshE,
    };
};

export default useEmployeeWorklogsPage;
