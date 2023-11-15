<template>
  <q-page class="flex flex-center">
    <q-form class="q-px-sm q-pt-md q-pb-md" @submit="onSubmit">
      <q-card square class="shadow-24" style="width: 400px;">
        <q-card-section class="bg-deep-purple-7">
          <h4 class="text-h5 text-white q-my-xs">{{ $t('pages.login.title') }}</h4>
        </q-card-section>
        <q-card-section>

          <q-input class="q-mb-sm" square clearable v-model="username" type="text" :label="$t('Username')"
            :rules="[val => (val && val.length > 2) || $t('forms.validations.invalid_username')]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <!-- <q-input
              class="q-mb-md"
              square
              clearable
              v-model="password"
              type="password"
              :label="$t('forms.inputs.password')"
              :rules="[
                    val => !!val || 'Please enter a password',
                    val => val.length >= 8 || 'Password must be at least 8 characters long',
                    val => /[A-Z]/.test(val) || 'Password must contain at least one uppercase letter',
                    val => /[a-z]/.test(val) || 'Password must contain at least one lowercase letter',
                    val => /\d/.test(val) || 'Password must contain at least one number',
                    val => /[!@#$%^&*]/.test(val) || 'Password must contain at least one special character'
                  ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          :rules="[
                  val => {
                    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
                    return (val && regex.test(val)) || 'Please enter a strong password'
                  }
              ]"
          -->
          <q-input class="q-mb-md" square clearable v-model="password" type="password"
            :label="$t('forms.inputs.password')">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-checkbox v-model="rememberMe" :label="$t('Remember me')" />
        </q-card-section>
        <q-card-actions class="q-px-lg">
          <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" :label="$t('Sign In')"
            type="submit" />
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
          <p class="text-grey-6">{{ $t("Don't have an account?") }}</p>
          <q-btn flat color="purple-4" :label="$t('Sign Up')" @click="goToSignUp" />
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { useAuthStore } from 'stores/auth'
import { api } from 'boot/axios'
import { Loading, Notify, QSpinnerFacebook } from 'quasar'

const authStore = useAuthStore();

export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },

  methods: {
    async onSubmit() {
      // write your logic to handle the login functionality
      console.log("Form submitted");
      this.login();
    },
    goToSignUp() {
      // write your logic to navigate to the sign up page
      console.log("Go to sign up");
      this.$router.push('register')
    },

    async login() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'black',
        message: 'Some important process  is in progress. Hang on...',
        messageColor: 'white',
        // boxClass: 'bg-grey-2 text-grey-9',
      })

      let vm = this;
      api.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(function (result) {
        let response = result.data;
        console.log(response);
        if (response.status != 1) {
          return;
        }

        var data = response.data;
        console.log(data);
        authStore.login(data.token, data.user);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
        vm.$router.push({ name: "Home" });

      }).catch(function (error) {
        console.log(error);
        Notify.create({
          position: "top-right",
          type: 'negative',
          message: 'Invalid Login',
          progress: true,
          multiLine: true,
          classes: "col-12"
        });
      }).finally(() => {
        this.$q.loading.hide();
      });
    }
  },
};
</script>
