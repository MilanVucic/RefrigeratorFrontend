<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <button @click="newFridge" class="new-fridge">+ New Fridge</button>

    <div v-if="!loading && fridges.length">
      <h2>Your fridges:</h2>
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
import { defineComponent, onMounted, ref } from 'vue';
import { useFridgeStore } from '../stores/fridgeStore';
import { storeToRefs } from 'pinia';
import FridgeListItem from '../components/FridgeListItem.vue';
import router from '../router';

export default defineComponent({
  components: { FridgeListItem },
  setup() {
    const store = useFridgeStore();
    const { fridges, loading, error } = storeToRefs(store);
    const deletingId = ref<number | null>(null);

    const newFridge = () => router.push('/fridges/new');
    const editFridge = (fridgeId: number) => router.push(`/fridges/${fridgeId}/edit`);

    const deleteFridge = async (id: number) => {
      if (!confirm('Are you sure you want to delete this fridge?')) return;

      try {
        deletingId.value = id;
        await store.deleteFridge(id);
      } catch (err) {
        console.error('Error deleting fridge:', err);
      } finally {
        deletingId.value = null;
      }
    };

    onMounted(() => {
      store.fetchFridges();
    });

    return { fridges, loading, error, newFridge, editFridge, deleteFridge, deletingId };
  },
});
</script>

<style scoped>
.new-fridge {
  margin: 8px;
}
.error {
  color: red;
}
</style>
