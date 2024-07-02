import { useAuthStore } from '../stores/auth'; // Replace 'path/to/authStoreModule' with the actual path to the module containing the useAuthStore function.

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
  
    if (!authStore.isLoggedIn) {
      return navigateTo('/login');
    }
  })