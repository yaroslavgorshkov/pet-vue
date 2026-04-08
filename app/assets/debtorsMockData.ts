export type DebtorInfo = {
    id: number
    fullName: string
    lic: string
    debt: number
}

export const debtorsMockData: DebtorInfo[] = [
    { debt: -100, fullName: 'Nikolay', id: 1, lic: '111'},
    { debt: -200, fullName: 'Polina', id: 2, lic: '112'},
    { debt: 300, fullName: 'Nastya', id: 3, lic: '113'},
    { debt: 400, fullName: 'Yarik', id: 4, lic: '114'},
    { debt: 500, fullName: 'Lesha', id: 5, lic: '115'},
    { debt: 600, fullName: 'Stepan', id: 6, lic: '116'}
]