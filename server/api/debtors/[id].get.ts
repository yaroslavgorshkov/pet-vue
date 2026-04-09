import { getDebtors } from "~~/server/utils/debtors";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    if(id !== undefined) {
        const debtors = await getDebtors();
        const foundDebtor = debtors.find(d => d.id === Number(id));
        return foundDebtor;
    }
})