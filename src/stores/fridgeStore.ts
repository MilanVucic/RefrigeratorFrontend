import { defineStore } from 'pinia';
import { fridgeService } from '../api/fridgeService';
import type { FridgeItemType, FridgeType } from '../types/fridgeType';

export const useFridgeStore = defineStore('fridge', {
    state: () => ({
        fridges: [] as FridgeType[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchFridges() {
            this.loading = true;
            this.error = null;
            try {
                this.fridges = await fridgeService.getFridges();
            } catch (err: any) {
                this.error = err.message || 'Failed to fetch fridges';
            } finally {
                this.loading = false;
            }
        },

        async getFridge(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const fridge = await fridgeService.getFridge(id);
                const index = this.fridges.findIndex(f => f.id === id);
                if (index !== -1) {
                    this.fridges[index] = fridge;
                } else {
                    this.fridges.push(fridge);
                }
                return fridge;
            } catch (err: any) {
                this.error = err.message || 'Failed to fetch fridge';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async createFridge(data: Partial<FridgeType>) {
            this.loading = true;
            this.error = null;
            try {
                const fridge = await fridgeService.createFridge(data);
                this.fridges.push(fridge);
                return fridge;
            } catch (err: any) {
                this.error = err.message || 'Failed to create fridge';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async updateFridge(id: number, data: Partial<FridgeType>) {
            this.loading = true;
            this.error = null;
            try {
                const fridge = await fridgeService.updateFridge(id, data);
                const index = this.fridges.findIndex(f => f.id === id);
                if (index !== -1) this.fridges[index] = fridge;
                return fridge;
            } catch (err: any) {
                this.error = err.message || 'Failed to update fridge';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async deleteFridge(id: number) {
            this.loading = true;
            this.error = null;
            try {
                await fridgeService.deleteFridge(id);
                this.fridges = this.fridges.filter(f => f.id !== id);
            } catch (err: any) {
                this.error = err.message || 'Failed to delete fridge';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async addItem(fridgeId: number, data: Partial<FridgeItemType>) {
            this.loading = true;
            this.error = null;
            try {
                const newItem = await fridgeService.createItem(fridgeId, data);

                const fridge = this.fridges.find(f => f.id === fridgeId);
                if (fridge) {
                    if (!fridge.items) fridge.items = [];
                    fridge.items.push(newItem);
                }

                return newItem;
            } catch (err: any) {
                this.error = err.message || 'Failed to add item';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async updateItem(id: number, data: Partial<FridgeItemType>) {
            this.loading = true;
            this.error = null;
            try {
                const updated = await fridgeService.updateItem(id, data);

                this.fridges = this.fridges.map(fridge => {
                    if (!fridge.items) return fridge;
                    return {
                        ...fridge,
                        items: fridge.items.map(item => (item.id === id ? updated : item)),
                    };
                });

                return updated;
            } catch (err: any) {
                this.error = err.message || 'Failed to update item';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async deleteItem(itemId: number) {
            this.loading = true;
            this.error = null;
            try {
                await fridgeService.deleteItem(itemId);

                this.fridges = this.fridges.map(fridge => {
                    if (!fridge.items) return fridge;
                    return {
                        ...fridge,
                        items: fridge.items.filter(item => item.id !== itemId),
                    };
                });
            } catch (err: any) {
                this.error = err.message || 'Failed to delete item';
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});
