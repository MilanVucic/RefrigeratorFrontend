<template>
  <div>
    <FridgeComponent v-if="fridge" :fridge="fridge" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fridgeService } from '../api/fridgeService';
import type { FridgeType } from '../types/fridgeType';
import FridgeComponent from '../components/FridgeComponent.vue';

export default defineComponent({
  components: { FridgeComponent },
  setup() {
    const route = useRoute();
    const fridge = ref<FridgeType | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchFridge = async () => {
      loading.value = true;
      error.value = null;
      try {
        fridge.value = await fridgeService.getFridge(Number(route.params.id));
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch fridge';
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchFridge);

    return { fridge, loading, error };
  },
});
</script>
