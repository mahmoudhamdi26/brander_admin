<template>
   <div>
      <q-form ref="userForm" greedy class="q-px-sm q-pb-md q-gutter-sm" @submit="onSubmit" @reset="onReset">
         <q-input square clearable v-model="user.name" type="text" label="Name"
            :rules="[val => !!val || 'Name is required']">
            <template v-slot:prepend>
               <q-icon name="person" />
            </template>
         </q-input>
         <q-input square clearable v-model="user.username" type="text" label="Username"
            :rules="[val => !!val || 'Username is required']">
            <template v-slot:prepend>
               <q-icon name="account_circle" />
            </template>
         </q-input>
         <q-input square clearable v-model="user.password" type="password" label="Password" :rules="[
            val => !!val || 'Password is required',
            val => val.length >= 8 || 'Password must be at least 8 characters long'
         ]">
            <template v-slot:prepend>
               <q-icon name="lock" />
            </template>
         </q-input>
         <q-input square clearable v-model="user.passwordConfirm" type="password" label="Confirm Password" :rules="[
            val => !!val || 'Password confirmation is required',
            val => val === this.user.password || 'Passwords do not match'
         ]">
            <template v-slot:prepend>
               <q-icon name="lock" />
            </template>
         </q-input>

         <q-select filled clearable option-value="id" option-label="title" emit-value map-options v-model="user.templates"
            multiple :options="templates" counter max-values="2" :hint="$t('forms.hints.max_2_selection')" />
         <q-separator />

         <q-card-actions align="right">
            <q-btn flat :label="$t('actions.cancel')" color="primary" v-close-popup />
            <q-btn flat :label="$t('actions.save')" color="primary" @click="onSubmit()" />
         </q-card-actions>
      </q-form>
   </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
   name: 'UserForm',
   props: {
      edit_id: {
         type: String,
         required: true
      }
   },
   data() {
      return {
         templates: [],
         user: {
            name: "",
            username: "",
            password: "",
            passwordConfirm: "",
            templates: [],
         }
      };
   },
   created() {
      this.loadTemplates();
   },
   methods: {
      loadTemplates() {
         api.get('/templates', { useAuth: true })
            .then(result => {
               let response = result.data
               if (response.status == 1) {
                  this.templates = response.data.items;
               }
            })
            .catch(error => {
               this.$q.notify({ color: 'negative', message: this.$t('msgs.load_data_failed') })
            })
      },
      async onSubmit() {
         let form = this.$refs.userForm
         // validate the form
         let valid = await form.validate()
         if (!valid) {
            return;
         }

         if (this.edit_id) {
            console.log("Form Edit submitted");
         } else {
            console.log("Form Create submitted");
            this.createUser();
         }
      },
      onReset() {
         // write your logic to handle the registration functionality
         console.log("Form Reset");
         this.user.name = "";
         this.user.username = "";
         this.user.password = "";
         this.user.passwordConfirm = "";
         this.user.templates = [];
      },

      createUser() {
         api.post('/users', this.user, { useAuth: true }).then(function (result) {
            let response = result.data;
            console.log(response);
            if (response.status != 1) {
               return;
            }
         }).catch(function (error) {
            console.log(error);
         }).finally(() => {
            // this.$q.loading.hide();
         });
      }
   },
})
</script>
