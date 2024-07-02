<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4">Bienvenue sur notre application</h1>
    <p class="mb-4">Ceci est la page d'accueil de notre application.</p>
    <UButton v-if="!isLoggedIn" to="/login" color="primary">Se connecter</UButton>
    <UButton v-else to="/profile" color="primary">Voir le profil</UButton>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>