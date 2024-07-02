<template>
    <div>
      <header class="bg-gray-800 text-white p-4">
        <nav class="container mx-auto flex justify-between items-center">
          <NuxtLink to="/" class="text-xl font-bold">Mon App</NuxtLink>
          <div>
            <UButton v-if="!isLoggedIn" to="/login" variant="ghost">Se connecter</UButton>
            <UButton v-if="!isLoggedIn" to="/register" variant="ghost">S'inscrire</UButton>
            <UButton v-if="isLoggedIn" to="/profile" variant="ghost">Profil</UButton>
            <UButton v-if="isLoggedIn" @click="logout" variant="ghost">Se déconnecter</UButton>
          </div>
        </nav>
      </header>
  
      <main>
        <slot />
      </main>
  
      <footer class="bg-gray-800 text-white p-4 mt-8">
        <div class="container mx-auto text-center">
          © {{ new Date().getFullYear() }} Mon Application
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '~/stores/auth'
  
  const authStore = useAuthStore()
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  
  const logout = () => {
    authStore.logout()
    navigateTo('/login')
  }
  </script>