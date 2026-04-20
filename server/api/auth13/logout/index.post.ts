export default defineEventHandler(async (event) => {
    deleteCookie(event, 'access');
});
