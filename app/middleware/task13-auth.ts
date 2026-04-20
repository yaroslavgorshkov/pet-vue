export default defineNuxtRouteMiddleware(() => {
    const accessCookie = useCookie<'granted' | null>('access');

    if (accessCookie.value !== 'granted') {
        return navigateTo('/task13/login');
    }
});
