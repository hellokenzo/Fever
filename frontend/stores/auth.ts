import { defineStore } from '@pinia/nuxt'
import { login, register, logout } from '~/services/api'

interface User {
  id: number
  username: string
  email: string
}

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  username: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(this: any, payload: LoginPayload) {
      const { user, token } = await login(payload)
      this.user = user
      this.token = token
      localStorage.setItem('token', token)
    },
    async register(this: any, payload: RegisterPayload) {
      const { user, token } = await register(payload)
      this.user = user
      this.token = token
      localStorage.setItem('token', token)
    },
    async logout(this: any) {
      await logout()
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async checkAuth(this: any) {
      const token = localStorage.getItem('token')
      if (token) {
        // Ici, vous pourriez vérifier la validité du token avec le backend
        this.token = token
        // Et récupérer les informations de l'utilisateur
      }
    },
  },
})