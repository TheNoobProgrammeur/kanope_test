<template>
  <q-form
    @submit="sendUser"
    class="q-gutter-md"
  >

    <q-input
      outlined
      filled
      v-model="form.username"
      label="username"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <q-input
      outlined
      filled
      v-model="form.email"
      type="email"
      label="email"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <q-input
      filled
      type="password"
      v-model="form.password"
      label="Password" />
    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script>
import {serviceApi} from "src/boot";

export default {
  name: "NewUserForm",
  props: ["addUser","closeForm"],
  methods: {
    sendUser(){
      serviceApi.createUser(
        this.form.username,
        this.form.email,
        this.form.password
      ).then((res) => {
        this.$q.notify({
          message: res.message,
          color: res.status ? 'positive' : 'negative',
          icon: 'announcement'
        });
        if(res.status) this.addUser(
          this.form.username,
          this.form.email
        );
        this.closeForm();
      });
    }
  },
  data(){
    return {
      form: {
        email: "",
        username: "",
        password: ""
      }
    }
  },
}
</script>

<style scoped>

</style>
