import type {
    MonthlyReport,
    SortDirection,
    SortValues,
    Team,
} from '~~/shared/task13/types';

const useTeamsPage = () => {
    const {
        data: teams,
        error,
        pending,
        refresh: refreshTeams,
    } = useFetch<Team[]>('/api/teams');

    const { data: reports, refresh: refreshReports } =
        useFetch<MonthlyReport[]>('/api/reports');

    const route = useRoute();
    const router = useRouter();

    const titleFilter = ref(route.query.title ? String(route.query.title) : '');
    const codeFilter = ref(route.query.code ? String(route.query.code) : '');
    const leadFilter = ref(route.query.lead ? String(route.query.lead) : '');
    const descriptionFilter = ref(
        route.query.description ? String(route.query.description) : ''
    );
    const onlyBehindPlanFilter = ref(route.query.onlyBehindPlan ? true : false);

    const sortValue = ref<SortValues>(
        route.query.sort ? (String(route.query.sort) as SortValues) : 'title'
    );
    const sortDirection = ref<SortDirection>(
        route.query.direction
            ? (String(route.query.direction) as SortDirection)
            : 'ascending'
    );

    watch(
        [
            titleFilter,
            codeFilter,
            leadFilter,
            descriptionFilter,
            onlyBehindPlanFilter,
            sortValue,
            sortDirection,
        ],
        ([
            titleFilterNew,
            codeFilterNew,
            leadFilterNew,
            descriptionFilterNew,
            onlyBehindPlanFilterNew,
            sortValueNew,
            sortDirectionNew,
        ]) => {
            router.replace({
                query: {
                    title: titleFilterNew === '' ? undefined : titleFilterNew,
                    code: codeFilterNew === '' ? undefined : codeFilterNew,
                    lead: leadFilterNew === '' ? undefined : leadFilterNew,
                    description:
                        descriptionFilterNew === ''
                            ? undefined
                            : descriptionFilterNew,
                    onlyBehindPlan:
                        onlyBehindPlanFilterNew === true ? 'true' : undefined,
                    sort: sortValueNew,
                    direction: sortDirectionNew,
                },
            });
        },
        { immediate: true }
    );

    const filteredTeams = computed(() => {
        if (teams.value === undefined) return undefined;
        let filtered = teams.value
            .filter((t) =>
                t.code.toLowerCase().includes(codeFilter.value.toLowerCase())
            )
            .filter((t) =>
                t.title.toLowerCase().includes(titleFilter.value.toLowerCase())
            )
            .filter((t) =>
                t.lead.toLowerCase().includes(leadFilter.value.toLowerCase())
            )
            .filter((t) =>
                t.description
                    .toLowerCase()
                    .includes(descriptionFilter.value.toLowerCase())
            );
        if (onlyBehindPlanFilter.value) {
            filtered = filtered.filter((t) => t.isBehindPlan);
        }
        if (sortDirection.value === 'ascending') {
            if (sortValue.value === 'code') {
                filtered.sort((t1, t2) => t1.code.localeCompare(t2.code));
            } else if (sortValue.value === 'description') {
                filtered.sort((t1, t2) =>
                    t1.description.localeCompare(t2.description)
                );
            } else if (sortValue.value === 'lead') {
                filtered.sort((t1, t2) => t1.lead.localeCompare(t2.lead));
            } else {
                filtered.sort((t1, t2) => t1.title.localeCompare(t2.title));
            }
        } else {
            if (sortValue.value === 'code') {
                filtered.sort((t1, t2) => t2.code.localeCompare(t1.code));
            } else if (sortValue.value === 'description') {
                filtered.sort((t1, t2) =>
                    t2.description.localeCompare(t1.description)
                );
            } else if (sortValue.value === 'lead') {
                filtered.sort((t1, t2) => t2.lead.localeCompare(t1.lead));
            } else {
                filtered.sort((t1, t2) => t2.title.localeCompare(t1.title));
            }
        }

        return filtered;
    });

    const recentWatchedTeamsList = ref<Team[] | undefined>(undefined);
    onMounted(() => {
        const recentWatchedTeams = localStorage.getItem('recentWatchedTeams');
        if (recentWatchedTeams === null) {
            localStorage.setItem('recentWatchedTeams', JSON.stringify([]));
            return;
        }
        try {
            const recentWatchedTeamsParsed = JSON.parse(
                recentWatchedTeams
            ) as Team[];
            recentWatchedTeamsList.value = recentWatchedTeamsParsed;
        } catch {
            localStorage.setItem('recentWatchedTeams', JSON.stringify([]));
            return;
        }
    });

    return {
        teams,
        reports,
        filteredTeams,
        error,
        pending,
        refreshTeams,
        refreshReports,
        titleFilter,
        codeFilter,
        leadFilter,
        descriptionFilter,
        onlyBehindPlanFilter,
        sortValue,
        sortDirection,
        recentWatchedTeamsList,
    };
};

export default useTeamsPage;
