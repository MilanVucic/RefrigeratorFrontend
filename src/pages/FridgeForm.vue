<template>
  <div class="fridge-edit-container">
    <h3>{{ isEdit ? 'Edit Fridge' : 'Create New Fridge' }}</h3>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="form.name" id="name" type="text" required />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea v-model="form.description" id="description"></textarea>
      </div>

      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fridgeService } from '../api/fridgeService';
import type { FridgeType } from '../types/fridgeType';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const fridgeId = Number(route.params.id);
    const isEdit = computed(() => !!fridgeId);

    const error = ref<string | null>(null);

    const form = ref({
      name: '',
      description: ''
    });

    // Load fridge if editing
    onMounted(async () => {
      if (!isEdit.value) return;

      try {
        const fridge: FridgeType = await fridgeService.getFridge(fridgeId);
        form.value.name = fridge.name;
        form.value.description = fridge.description || '';
      } catch (err: any) {
        error.value = 'Failed to load fridge details';
      }
    });

    const handleSubmit = async () => {
      error.value = null;

      try {
        if (isEdit.value) {
          await fridgeService.updateFridge(fridgeId, form.value);
        } else {
          await fridgeService.createFridge(form.value);
        }

        await router.push('/fridges');
      } catch (err: any) {
        error.value = err.message || 'Failed to save fridge';
      }
    };

    return { form, isEdit, handleSubmit, error };
  }
});
</script>

<style scoped>
.fridge-edit-container {
  min-width: 400px;
  margin: 50px auto;
  padding: 1rem 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.fridge-edit-container label {
  display: block;
  margin-bottom: 0.2rem;
}

.fridge-edit-container input,
.fridge-edit-container textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.4rem;
  box-sizing: border-box;

  resize: vertical;
  min-height: 2.4em;
  line-height: 1.2em;
}

.fridge-edit-container button {
  padding: 0.5rem 1rem;
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
