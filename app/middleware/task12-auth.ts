export default defineNuxtRouteMiddleware(() => {
    const access = useCookie<null | 'granted'>('access');

    if (access.value !== 'granted') {
        return navigateTo('/task12/auth');
    }
});
