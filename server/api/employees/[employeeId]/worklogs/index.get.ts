export default defineEventHandler(async (event) => {
    const employeeId = event.context.params?.employeeId;
    if(employeeId === undefined) {
        return undefined;
    }

    return await getWorklogsByEmployeeId(Number(employeeId));
})