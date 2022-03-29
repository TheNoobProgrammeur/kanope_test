<template>
  <div class="q-pa-md" style="max-width: 400px">
  <q-form
  @submit="onSubmit"
  class="q-gutter-md"
  >
    <q-input
      outlined
      filled
      v-model="form.email"
      type="email"
      label="Your email"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <q-input
      filled
      type="password"
      v-model="form.password"
      label="Your password" />
    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
    </div>
  </q-form>
  </div>
</template>

<script>
import {serviceApi} from "src/boot";

import {login} from "src/service/auth";

export default {
  name: "loginForm",
  data () {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    onSubmit(){
      serviceApi.login(this.form.email, this.form.password)
        .then((res) => {
            this.$q.notify({
              message: res.message,
              color: res.status ? 'positive' : 'negative',
              icon: 'announcement'
            });
            login();
            this.$router.push("/sensor");
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
