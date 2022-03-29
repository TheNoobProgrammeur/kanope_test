<template>
  <q-table
    title="Rooter"
    :rows="rooter"
    :columns="col"
    row-key="imei"
  >

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
        </q-td>
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.value }}
          <q-popup-edit
            v-if="col.editable"
            v-model="props.row.name"
            title="Update name"
            buttons
            @save="(value) => saveName(value, props.row.imei)"
            v-slot="scope" >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td>
          <SensorChart :sensor-table="props.row.sensorTable" />
        </q-td>
      </q-tr>

    </template>


  </q-table>
</template>

<script>
import SensorChart from "components/rooter/SensorChart";
import {serviceApi} from "src/boot";
const col =[
  {
    name: "imei",
    required: true,
    label: "IMEI",
    align: 'left',
    field: row => row.imei,
    sortable: false,
    editable: false
  },
  {
    name: "Name",
    required: true,
    label: "Rooter Name",
    align: 'left',
    field: row => row.name,
    sortable: true,
    editable: true
  },
]
export default {
  name: "RooterTable",
  components: {SensorChart},
  props: ["rooter"],
  methods: {
    saveName(newName, imei){
      serviceApi.updateRooterName(newName, imei)
        .then((res) => {
          this.$q.notify({
            message: res.message,
            color: res.status ? 'positive' : 'negative',
            icon: 'announcement'
          });
        })
    }
  },
  setup(){
    return {
      col
    }
  }
}
</script>

<style scoped>

</style>
