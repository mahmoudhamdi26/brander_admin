<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-card square class="shadow-24" style="width: 400px;">
      <q-card-section class="bg-deep-purple-7">
        <h4 class="text-h5 text-white q-my-sm">Registration</h4>
      </q-card-section>
      <q-card-section>
        <q-form
          class="q-px-sm q-pt-xl q-pb-lg"
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-input
            square
            clearable
            v-model="name"
            type="text"
            label="Name"
            :rules="[val => !!val || 'Name is required']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="username"
            type="text"
            label="Username"
            :rules="[val => !!val || 'Username is required']"
          >
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="password"
            type="password"
            label="Password"
            :rules="[
              val => !!val || 'Password is required',
              val => val.length >= 8 || 'Password must be at least 8 characters long'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="passwordConfirm"
            type="password"
            label="Confirm Password"
            :rules="[
              val => !!val || 'Password confirmation is required',
              val => val === password || 'Passwords do not match'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-lg">
        <q-btn
          unelevated
          size="lg"
          color="purple-4"
          class="full-width text-white"
          label="Get Started"
          type="submit"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-sm">
        <p class="text-grey-6">Already have an account?</p>
        <q-btn flat color="purple-4" label="Sign In" @click="goToSignIn" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Loading } from 'quasar'

export default {
  setup() {},
  data() {
    return {
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    onSubmit() {
      // write your logic to handle the registration functionality
      console.log("Form submitted");
    },
    onReset() {
      // write your logic to reset the form fields
      this.name = "";
      this.username = "";
      this.password = "";
      this.passwordConfirm = "";
    },
    goToSignIn() {
      // write your logic to navigate to the sign in page
      console.log("Go to sign in");
      this.$router.push('login');
    },
  },
};
</script>
