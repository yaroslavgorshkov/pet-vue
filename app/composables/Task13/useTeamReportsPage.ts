import type { MonthlyReport, Team } from '~~/shared/task13/types';

const useTeamReportsPage = () => {
    const route = useRoute();
    const teamId = computed(() => route.params.teamId || '');

    const {
        data: reports,
        error,
        pending,
        refresh: refreshReports,
    } = useFetch<MonthlyReport[]>(`/api/teams/${teamId.value}/reports`);
    const { data: team, refresh: refreshTeam } = useFetch<Team>(
        `/api/teams/${teamId.value}`
    );

    watch(team, (teamNew) => {
        if (teamNew === undefined) return;
        const recentWatchedTeams = localStorage.getItem('recentWatchedTeams');
        if (recentWatchedTeams === null) {
            localStorage.setItem('recentWatchedTeams', JSON.stringify([]));
            return;
        }
        try {
            const recentWatchedTeamsParsed = JSON.parse(
                recentWatchedTeams
            ) as Team[];

            if (
                recentWatchedTeamsParsed.map((t) => t.id).includes(teamNew.id)
            ) {
                let filtered = recentWatchedTeamsParsed.filter(
                    (t) => t.id !== teamNew.id
                );
                filtered.unshift(teamNew);
                localStorage.setItem(
                    'recentWatchedTeams',
                    JSON.stringify(filtered.slice(0, 5))
                );
            } else {
                recentWatchedTeamsParsed.unshift(teamNew);
                localStorage.setItem(
                    'recentWatchedTeams',
                    JSON.stringify(recentWatchedTeamsParsed.slice(0, 5))
                );
            }
        } catch {
            localStorage.setItem('recentWatchedTeams', JSON.stringify([]));
            return;
        }
    });

    return {
        reports,
        team,
        error,
        pending,
        refreshReports,
        refreshTeam,
    };
};

export default useTeamReportsPage;
