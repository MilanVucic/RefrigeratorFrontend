import api from "../api.ts";
import type { FridgeItemType, FridgeType } from "../types/fridgeType.ts";

export const fridgeService = {
    // --- Fridges ---
    async getFridges(): Promise<FridgeType[]> {
        const response = await api.get<FridgeType[]>('fridges/');
        return response.data;
    },

    async getFridge(id: number): Promise<FridgeType> {
        const response = await api.get<FridgeType>(`fridges/${id}/`);
        return response.data;
    },

    async createFridge(data: Partial<FridgeType>): Promise<FridgeType> {
        const response = await api.post<FridgeType>('fridges/', data);
        return response.data;
    },

    async updateFridge(id: number, data: Partial<FridgeType>): Promise<FridgeType> {
        const response = await api.put<FridgeType>(`fridges/${id}/`, data);
        return response.data;
    },

    async deleteFridge(id: number) {
        const response = await api.delete(`fridges/${id}/`);
        return response.data;
    },

    // --- Items ---

    async createItem(data: Partial<FridgeItemType>): Promise<FridgeItemType> {
        const response = await api.post<FridgeItemType>(`/items/`, data);
        return response.data;
    },

    async updateItem(id: number, data: Partial<FridgeItemType>): Promise<FridgeItemType> {
        const response = await api.patch<FridgeItemType>(`items/${id}/`, data);
        return response.data;
    },

    async deleteItem(id: number) {
        const response = await api.delete(`items/${id}/`);
        return response.data;
    },
};
