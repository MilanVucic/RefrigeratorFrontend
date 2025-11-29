<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p class="link">
      Don't have an account? <router-link to="/register">Register</router-link>.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '../stores/authStore.ts';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const loading = ref(false);
    const error = ref<string | null>(null);

    const handleLogin = async () => {
      error.value = null;
      loading.value = true;
      try {
        await auth.login(username.value, password.value);
        console.log('Login successful. Access token:', auth.accessToken);
        await router.push('/fridges');
      } catch (err: any) {
        error.value = err.message || 'Login failed';
      } finally {
        loading.value = false;
      }
    };

    return { username, password, handleLogin, loading, error };
  },
});
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.login-container h1 {
  text-align: center;
}

.login-container label {
  display: block;
  margin-bottom: 0.2rem;
}

.login-container input {
  width: 100%;
  box-sizing: border-box; /* ensures padding/border are included in width */
  margin-bottom: 1rem;
  padding: 0.4rem;
}

.login-container button {
  padding: 0.5rem 1rem;
}

.error {
  color: red;
  margin-top: 0.5rem;
  text-align: center;
}

.link {
  margin-top: 1rem;
}
</style>

