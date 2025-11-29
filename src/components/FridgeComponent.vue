<template>
  <div class="fridge-card">
    <h2>{{ fridge.name }}</h2>
    <p>{{ fridge.description || 'No description' }}</p>

    <button @click="showAddModal = true" class="add-item-btn">+ Add Item</button>

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

    <!-- Add Item Modal -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h3>Add New Item</h3>
        <form @submit.prevent="submitNewItem">
          <div class="field">
            <label>Name:</label>
            <input v-model="newItem.name" required />
          </div>
          <div class="field">
            <label>Quantity:</label>
            <input type="number" v-model.number="newItem.quantity" min="1" required />
          </div>
          <div class="field">
            <label>Time Stored:</label>
            <input type="date" v-model="newItem.time_stored" required />
          </div>
          <div class="field">
            <label>Best Before:</label>
            <input type="date" v-model="newItem.best_before" required />
          </div>
          <div class="buttons">
            <button type="submit">Save</button>
            <button type="button" @click="cancelNewItem">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
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
  setup(props) {
    const store = useFridgeStore();
    const showAddModal = ref(false);

    const newItem = reactive<Partial<FridgeItemType>>({
      name: '',
      quantity: 1,
      time_stored: new Date().toISOString().split('T')[0],
      best_before: '',
      fridge: props.fridge.id,
    });

    const handleUpdateItem = async (updatedItem: FridgeItemType) => {
      try {
        await store.updateItem(updatedItem.id!, updatedItem);
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

    const submitNewItem = async () => {
      if (!newItem.name || !newItem.quantity || !newItem.time_stored || !newItem.best_before) {
        alert('Please fill in all fields.');
        return;
      }
      try {
        await store.addItem(newItem);
        showAddModal.value = false;
        Object.assign(newItem, {
          name: '',
          quantity: 1,
          time_stored: new Date().toISOString().split('T')[0],
          best_before: '',
        });
      } catch (err: any) {
        console.error('Failed to add item:', err);
        alert('Failed to add item.');
      }
    };

    const cancelNewItem = () => {
      showAddModal.value = false;
      Object.assign(newItem, {
        name: '',
        quantity: 1,
        time_stored: new Date().toISOString().split('T')[0],
        best_before: '',
      });
    };

    return {
      showAddModal,
      newItem,
      handleUpdateItem,
      handleDeleteItem,
      submitNewItem,
      cancelNewItem,
    };
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

.add-item-btn {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #1f1f1f;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  width: 300px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
