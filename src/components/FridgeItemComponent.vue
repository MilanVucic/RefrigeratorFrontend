<template>
  <div class="fridge-item">
    <div class="field">
      <label>Name:</label>
      <span v-if="!isEditing">{{ item.name }}</span>
      <input v-else v-model="editableItem.name" />
    </div>

    <div class="field">
      <label>Quantity:</label>
      <span v-if="!isEditing">{{ item.quantity }}</span>
      <input v-else type="number" v-model.number="editableItem.quantity" />
    </div>

    <div class="field">
      <label>Time Stored:</label>
      <span v-if="!isEditing">{{ formatDate(item.time_stored) }}</span>
      <input v-else type="date" v-model="editableItem.time_stored" />
    </div>

    <div class="field">
      <label>Best Before:</label>
      <span v-if="!isEditing">{{ formatDate(item.best_before) }}</span>
      <input v-else type="date" v-model="editableItem.best_before" />
    </div>

    <div class="buttons">
      <button v-if="!isEditing" @click="isEditing = true">Edit</button>
      <button v-if="isEditing" @click="save">Save</button>
      <button v-if="isEditing" @click="cancel">Cancel</button>
      <button @click="requestDelete">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { FridgeItemType } from '../types/fridgeType';

export default defineComponent({
  name: 'FridgeItemComponent',
  props: {
    item: {
      type: Object as PropType<FridgeItemType>,
      required: true,
    },
  },
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    const isEditing = ref(false);
    const editableItem = ref({ ...props.item });

    watch(
        () => props.item,
        (newItem) => {
          editableItem.value = { ...newItem };
        }
    );

    const save = () => {
      emit('update', editableItem.value);
      isEditing.value = false;
    };

    const cancel = () => {
      editableItem.value = { ...props.item };
      isEditing.value = false;
    };

    const requestDelete = () => {
      if (confirm('Delete this item?')) {
        emit('delete', props.item.id);
      }
    };

    const formatDate = (date?: string) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString();
    };

    return { isEditing, editableItem, save, cancel, requestDelete, formatDate };
  },
});
</script>

<style scoped>
.fridge-item {
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}
.field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.field label {
  width: 90px;
  font-weight: bold;
}
.field input {
  flex: 1;
}
.buttons {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}
</style>