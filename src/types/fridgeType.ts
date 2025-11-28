export interface FridgeItemType {
    id: number;
    name: string;
    time_stored: string;
    best_before: string;
}

export interface FridgeType {
    id: number;
    name: string;
    description?: string;
    items?: FridgeItemType[];
}
