<template>
  <div class="fridge-card">
    <h2>{{ fridge.name }}</h2>
    <p>{{ fridge.description || 'No description' }}</p>
    <ul v-if="fridge.items && fridge.items.length">
      <li v-for="item in fridge.items" :key="item.id">
        {{ item.name }} (Stored: {{ item.time_stored }}, Best before: {{ item.best_before }})
      </li>
    </ul>
    <div v-else>No items in this fridge.</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue';
import type { FridgeType as FridgeType } from '../types/fridgeType.ts';

export default defineComponent({
  name: 'Fridge',
  props: {
    fridge: {
      type: Object as PropType<FridgeType>,
      required: true,
    },
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