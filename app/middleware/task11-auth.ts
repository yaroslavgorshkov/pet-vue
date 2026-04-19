export default defineNuxtRouteMiddleware(() => {
    const access = useCookie<null | 'granted'>('access', {
        default: () => null,
    });
    if (access.value !== 'granted') {
        return navigateTo('/task11/login');
    }
});
