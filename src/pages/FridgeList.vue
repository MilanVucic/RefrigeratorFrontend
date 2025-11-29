<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && fridges.length">
      <h2>Your fridges:</h2>
      <FridgeListItem
          v-for="fridge in fridges"
          :key="fridge.id"
          :fridge="fridge"
      />
    </div>

    <p v-if="!loading && !fridges.length">No fridges found.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fridgeService } from '../api/fridgeService';
import type { FridgeType } from '../types/fridgeType';
import FridgeListItem from '../components/FridgeListItem.vue';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  components: { FridgeListItem },
  setup() {
    const auth = useAuthStore();
    const fridges = ref<FridgeType[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchFridges = async () => {
      loading.value = true;
      error.value = null;
      try {
        fridges.value = await fridgeService.getFridges();
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch fridges';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      if (auth.accessToken) fetchFridges();
    });

    return { fridges, loading, error };
  },
});
</script>
