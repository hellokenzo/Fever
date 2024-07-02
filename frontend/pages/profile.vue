<template>
    <div class="container mx-auto p-4">
      <UCard class="w-full max-w-2xl mx-auto">
        <template #header>
          <h2 class="text-2xl font-bold">Profil Utilisateur</h2>
        </template>
  
        <div v-if="user">
          <p><strong>Nom d'utilisateur:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
  
        <template #footer>
          <UButton color="primary" @click="logout">
            Se déconnecter
          </UButton>
        </template>
      </UCard>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '~/stores/auth'
  
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)
  
  const logout = () => {
    authStore.logout()
    navigateTo('/login')
  }
  </script>