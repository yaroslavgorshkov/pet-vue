export default defineEventHandler( async (event) => {
    const worklogId = event.context.params?.worklogId;
    if(worklogId === undefined) {
        return undefined;
    }

    return await getWorklogById(Number(worklogId));
})