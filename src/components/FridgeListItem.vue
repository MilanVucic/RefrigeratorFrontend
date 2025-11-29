<template>
  <div class="fridge-item">
    <div class="info">
      <h3>{{ fridge.name }}</h3>
    </div>

    <div class="actions">
      <RouterLink :to="`/fridges/${fridge.id}`" class="details-btn">
        Details
      </RouterLink>

      <button class="edit-btn" @click="$emit('edit', fridge)">
        Edit
      </button>

      <button class="delete-btn" @click="$emit('delete', fridge)">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import type {FridgeType} from '../types/fridgeType';

export default defineComponent({
  name: 'FridgeListItem',

  props: {
    fridge: {
      type: Object as () => FridgeType,
      required: true,
    },
  },

  setup() {
    const onEdit = () => {
      console.log('Edit clicked (not implemented yet)');
    };

    const onDelete = () => {
      console.log('Delete clicked (not implemented yet)');
    };

    return {onEdit, onDelete};
  },
});
</script>

<style scoped>
.fridge-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.info h3 {
  margin: 8px;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.details-btn,
.edit-btn,
.delete-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.details-btn {
  background: #2d72d9;
  color: white;
}

.edit-btn {
  background: #f0ad4e;
  color: white;
}

.delete-btn {
  background: #d9534f;
  color: white;
}
</style>
