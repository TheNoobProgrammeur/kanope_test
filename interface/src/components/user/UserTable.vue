<template>

  <q-dialog v-model="add">
    <q-card>
      <q-card-section>
        <div class="text-h6">New User</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <NewUserForm :close-form="closeForm" :add-user="addUser"/>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-table
    title="Users"
    :rows="users"
    :columns="columns"
    row-key="_id"
  >
    <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="person_add"
          label="Add User"
          no-caps
          @click="add = true"
        />
    </template>

  </q-table>
</template>

<script>

import {ref} from "vue";
import NewUserForm from "components/user/NewUserForm";

const columns = [
  {
    name: "userName",
    required: true,
    label: "User Name",
    align: 'left',
    field: row => row.userName,
    sortable: false,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: 'left',
    field: row => row.email,
    sortable: true,
  },
]
export default {
  name: "UserTable",
  components: {NewUserForm},
  props: ["users","addUser"],
  methods: {
    closeForm(){
      this.add = false;
    }
  },
  setup(){
    return {
      columns,
      add: ref(false),
    }
  }
}
</script>

<style scoped>

</style>
