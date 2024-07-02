<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <UCard class="w-full max-w-md">
        <template #header>
          <h2 class="text-2xl font-bold">Connexion</h2>
        </template>
  
        <UForm :state="formState" @submit="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="formState.email" type="email" placeholder="votre@email.com" />
          </UFormGroup>
  
          <UFormGroup label="Mot de passe" name="password">
            <UInput v-model="formState.password" type="password" placeholder="Votre mot de passe" />
          </UFormGroup>
  
          <UButton type="submit" color="primary" block :loading="loading">
            Se connecter
          </UButton>
        </UForm>
  
        <template #footer>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p class="text-sm mt-4">
            Pas encore de compte ?
            <NuxtLink to="/register" class="text-blue-500 hover:underline">S'inscrire</NuxtLink>
          </p>
        </template>
      </UCard>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  
  const formState = reactive({
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
      await authStore.login(formState)
      navigateTo('/profile')
    } catch (e) {
      error.value = "Erreur de connexion. Veuillez vérifier vos identifiants."
    } finally {
      loading.value = false
    }
  }
  </script>