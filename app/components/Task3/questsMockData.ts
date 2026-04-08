type QuestZone = 'archer' | 'warrior' | 'shieldman' | 'wizard'; 

export type QuestData = {
    id: number;
    title: string;
    zone: QuestZone;
    reward: number;
    isCompleted: boolean;
}

export const questsMockData: QuestData[] = [
    {id: 1, isCompleted: false, reward: 100, title: 'Kill 10 zombies', zone: 'archer'},
    {id: 2, isCompleted: true, reward: 120, title: 'Kill 20 zombies', zone: 'shieldman'},
    {id: 3, isCompleted: false, reward: 130, title: 'Kill 30 zombies', zone: 'warrior'},
    {id: 4, isCompleted: true, reward: 40, title: 'Kill 10 skeletons', zone: 'wizard'},
    {id: 5, isCompleted: false, reward: 200, title: 'Kill 20 skeletons', zone: 'archer'},
    {id: 6, isCompleted: true, reward: 160, title: 'Kill 30 skeletons', zone: 'shieldman'},
    {id: 7, isCompleted: false, reward: 400, title: 'Kill 10 orcs', zone: 'warrior'},
    {id: 8, isCompleted: true, reward: 170, title: 'Kill 20 orcs', zone: 'wizard'},
    {id: 9, isCompleted: false, reward: 130, title: 'Kill 30 orcs', zone: 'archer'},
]