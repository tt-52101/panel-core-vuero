<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { useDarkmode } from '/@src/stores/darkmode'
import { useUserSession } from '/@src/stores/userSession'
import { useNotyf } from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import { useI18n } from 'vue-i18n'
import { Field, useForm } from 'vee-validate'
import * as yup from 'yup'
import { authenticateUser } from '/@src/services/auth/account'

const { t } = useI18n()
const isLoading = ref(false)
const darkmode = useDarkmode()
const router = useRouter()
const route = useRoute()
const notyfi = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const schema = yup.object({
  email: yup
    .string()
    .required(t('auth.errors.email.empty'))
    .email(t('auth.errors.email.format')),
  password: yup.string().required(t('auth.errors.password.empty')),
  remember: yup.boolean().notRequired(),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onLogin = handleSubmit(async (values) => {
  if (!isLoading.value) {
    isLoading.value = true

    try {
      await authenticateUser('/auth', values)

      if (redirect) {
        router.push(redirect)
      } else {
        router.push({
          name: 'app',
        })
      }

      notyfi.dismissAll()
      notyfi.success(`${t('auth.logged-in')}, ${userSession.user!.username}`)
    } catch (err: any) {
      if (err.response?.status !== undefined) {
        if (err.response.status !== 422) throw err
        notyfi.error({
          message: Object.values<string>(err.response.data.errors).flat()[0],
          duration: 5000,
        })
      }
    } finally {
      isLoading.value = false
    }
  }
})

// const handleLogin = async () => {
//   if (!isLoading.value) {
//     isLoading.value = true
//
//     await sleep(2000)
//     userSession.setToken('logged-in')
//
//     notif.dismissAll()
//     notif.success('Welcome back, Erik Kovalsky')
//
//     if (redirect) {
//       router.push(redirect)
//     } else {
//       router.push({
//         name: 'app',
//       })
//     }
//
//     isLoading.value = false
//   }
// }

useHead({
  title: 'Auth Login - Vuero',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-8 h-hidden-mobile h-hidden-tablet-p hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/vuero-banking-light.png?format=webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/vuero-banking-dark.png?format=webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <label
            class="dark-mode ml-auto"
            tabindex="0"
            @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
          >
            <input
              type="checkbox"
              :checked="!darkmode.isDark"
              @change="darkmode.onChange"
            />
            <span></span>
          </label>
          <div class="auth-logo">
            <RouterLink :to="{ name: 'index' }">
              <AnimatedLogo width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>Welcome Back.</h2>
                  <p>Please sign in to your account</p>
                  <RouterLink :to="{ name: 'auth' }">
                    I do not have an account yet
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit.prevent="onLogin">
                    <div class="login-form">
                      <!-- Username -->
                      <Field>
                        <VControl icon="feather:user">
                          <VInput
                            type="text"
                            placeholder="Username"
                            autocomplete="username"
                            name="email"
                            :rules="schema"
                          />
                        </VControl>
                      </Field>
                      <ErrorMessage name="email" />
                      <!-- Password -->
                      <Field>
                        <VControl icon="feather:lock">
                          <VInput
                            type="password"
                            placeholder="Password"
                            autocomplete="current-password"
                            name="password"
                          />
                        </VControl>
                      </Field>
                      <ErrorMessage name="password" />
                      <!-- Switch -->
                      <VField>
                        <VControl class="setting-item">
                          <VCheckbox label="Remember me" paddingless />
                        </VControl>
                      </VField>

                      <!-- Submit -->
                      <div class="login">
                        <VButton
                          :loading="isLoading"
                          color="primary"
                          type="submit"
                          bold
                          fullwidth
                          raised
                        >
                          Sign In
                        </VButton>
                      </div>

                      <div class="forgot-link has-text-centered">
                        <a>Forgot Password?</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
