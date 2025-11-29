<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && fridges.length">
      <h2>Your fridges:</h2>
      <button @click="newFridge" class="new-fridge">+ New Fridge</button>
      <FridgeListItem
          v-for="fridge in fridges"
          :key="fridge.id"
          :fridge="fridge"
          @edit="editFridge"
          @delete="deleteFridge"
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
import router from "../router";

export default defineComponent({
  components: { FridgeListItem },
  setup() {
    const auth = useAuthStore();
    const fridges = ref<FridgeType[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const newFridge = () => {
      router.push('/fridges/new');
    };

    const editFridge = (fridge: FridgeType) => {
      router.push(`/fridges/${fridge.id}/edit`);
    };

    const deleteFridge = async (id: number) => {
      // will hook up later
      console.log('Delete fridge', id);
    };

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

    return { fridges, loading, error, newFridge, editFridge, deleteFridge };
  },
});
</script>

<style scoped>
.new-fridge {
  margin: 8px;
}
</style>
