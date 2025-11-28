<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <div>
        <label for="password2">Confirm Password:</label>
        <input v-model="password2" id="password2" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p class="link">
      Already have an account? <router-link to="/login">Login here</router-link>.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const password2 = ref('');
    const loading = ref(false);
    const error = ref<string | null>(null);

    const handleRegister = async () => {
      error.value = null;
      loading.value = true;

      if (password.value !== password2.value) {
        error.value = "Passwords don't match";
        loading.value = false;
        return;
      }

      try {
        await api.post('accounts/register/', {
          username: username.value,
          email: email.value,
          password: password.value,
          password2: password2.value,
        });
        router.push('/login');
      } catch (err: any) {
        error.value = err.response?.data?.detail || 'Registration failed';
      } finally {
        loading.value = false;
      }
    };

    return { username, email, password, password2, handleRegister, loading, error };
  },
});
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 1rem;      /* this applies padding evenly left and right */
  border: 1px solid #ccc;
  border-radius: 8px;
}

.register-container label {
  display: block;
  margin-bottom: 0.2rem;
}

.register-container input {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.register-container button {
  padding: 0.5rem 1rem;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.link {
  margin-top: 1rem;
}
</style>