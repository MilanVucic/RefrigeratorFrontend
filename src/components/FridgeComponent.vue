<template>
  <div class="fridge-card">
    <h2>{{ fridge.name }}</h2>
    <p>{{ fridge.description || 'No description' }}</p>

    <div v-if="fridge.items && fridge.items.length">
      <FridgeItemComponent
          v-for="item in fridge.items"
          :key="item.id"
          :item="item"
          @update="handleUpdateItem"
          @delete="handleDeleteItem"
      />
    </div>
    <div v-else>No items in this fridge.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { FridgeType, FridgeItemType } from '../types/fridgeType';
import FridgeItemComponent from './FridgeItemComponent.vue';
import { useFridgeStore } from '../stores/fridgeStore';

export default defineComponent({
  name: 'FridgeComponent',
  components: { FridgeItemComponent },
  props: {
    fridge: {
      type: Object as PropType<FridgeType>,
      required: true,
    },
  },
  setup() {
    const store = useFridgeStore();

    const handleUpdateItem = async (updatedItem: FridgeItemType) => {
      try {
        await store.updateItem(updatedItem.id, updatedItem);
      } catch (err: any) {
        console.error('Failed to update item:', err);
        alert('Failed to update item.');
      }
    };

    const handleDeleteItem = async (itemId: number) => {
      try {
        await store.deleteItem(itemId);
      } catch (err: any) {
        console.error('Failed to delete item:', err);
        alert('Failed to delete item.');
      }
    };

    return { handleUpdateItem, handleDeleteItem };
  },
});
</script>

<style scoped>
.fridge-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
}
</style>
