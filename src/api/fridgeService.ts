import api from "../api.ts";
import type {FridgeType} from "../types/fridgeType.ts";


export const fridgeService = {
    async getFridges(): Promise<FridgeType[]> {
        const response = await api.get<FridgeType[]>('fridges/');
        console.log(response);
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
};