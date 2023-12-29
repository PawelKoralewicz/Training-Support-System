export interface IGroceries {
    data: [
        {
            id: number,
            attributes: IGrocery;
        }
    ]
}

export interface IGrocery {
    tempId?: number;
    name: string,
    caloriesPerHundredGrams: number,
    carbsPerHundredGrams: number,
    proteinPerHundredGrams: number,
    fatsPerHundredGrams: number,
    defaultPortioning: string,
    singlePortionGrammature: number,
    foodFamily: string[]
}