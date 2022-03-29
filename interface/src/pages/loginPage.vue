<template>
  <div
    class="fullscreen text-white text-center q-pa-md flex flex-center"
  >
   <LoginForm />
  </div>
</template>

<script>
import {defineComponent} from "vue";
import LoginForm from "components/loginForm";

export default defineComponent({
  name: "LoginPage",
  components: {LoginForm}
});
</script>

<style scoped>

</style>
