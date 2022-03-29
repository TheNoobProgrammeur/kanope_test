<template>
  <q-page>
    <div class="q-pa-md">
      <UserTable :users="users" :add-user="addUser" />
    </div>
  </q-page>
</template>

<script>
import {ref} from "vue";
import {serviceApi} from "src/boot";
import UserTable from "components/user/UserTable";

export default {
  name: "UserAdminPage",
  components: {UserTable},
  methods: {
    addUser(userName, email) {
      this.users.push({
        userName,
        email
      })
    },
  },
  setup(){
    const users = ref([]);
    serviceApi.getUser().then((res) => users.value = res.data);
    return {
      users
    }
  }
}
</script>

<style scoped>

</style>
