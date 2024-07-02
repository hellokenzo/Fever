<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <UCard class="w-full max-w-md">
        <template #header>
          <h2 class="text-2xl font-bold">Inscription</h2>
        </template>
  
        <UForm :state="formState" @submit="onSubmit">
          <UFormGroup label="Nom d'utilisateur" name="username">
            <UInput v-model="formState.username" placeholder="Votre nom d'utilisateur" />
          </UFormGroup>
  
          <UFormGroup label="Email" name="email">
            <UInput v-model="formState.email" type="email" placeholder="votre@email.com" />
          </UFormGroup>
  
          <UFormGroup label="Mot de passe" name="password">
            <UInput v-model="formState.password" type="password" placeholder="Votre mot de passe" />
          </UFormGroup>
  
          <UButton type="submit" color="primary" block :loading="loading">
            S'inscrire
          </UButton>
        </UForm>
  
        <template #footer>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p class="text-sm mt-4">
            Déjà un compte ?
            <NuxtLink to="/login" class="text-blue-500 hover:underline">Se connecter</NuxtLink>
          </p>
        </template>
      </UCard>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  
  const formState = reactive({
    username: '',
    email: '',
    password: ''
  })
  
  const loading = ref(false)
  const error = ref('')
  const authStore = useAuthStore()
  
  const onSubmit = async () => {
    loading.value = true
    error.value = ''
  
    try {
      await authStore.register(formState)
      navigateTo('/profile')
    } catch (e) {
      error.value = "Erreur lors de l'inscription. Veuillez réessayer."
    } finally {
      loading.value = false
    }
  }
  </script>