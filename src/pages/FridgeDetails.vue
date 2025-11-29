<template>
  <div>
    <FridgeComponent v-if="fridge" :fridge="fridge" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFridgeStore } from '../stores/fridgeStore';
import type { FridgeType } from '../types/fridgeType';
import FridgeComponent from '../components/FridgeComponent.vue';

export default defineComponent({
  components: { FridgeComponent },
  setup() {
    const route = useRoute();
    const store = useFridgeStore();
    const fridgeId = Number(route.params.id);

    // Make fridge reactive from store
    const fridge = computed<FridgeType | undefined>(() =>
        store.fridges.find(f => f.id === fridgeId)
    );

    const loading = computed(() => store.loading);
    const error = computed(() => store.error);

    onMounted(async () => {
      if (!fridge.value) {
        await store.getFridge(fridgeId);
      }
    });

    return { fridge, loading, error };
  },
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
