<template>
  <q-dialog v-model="add">
    <q-card>
      <q-card-section>
        <div class="text-h6">New Sensor</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
      <NewSensorForm :add-sensor="addSensor" :close-form="closeForm" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-table
    title="Sensor"
    :rows="sensors"
    :columns="headerColumns"
    row-key="macAddress"
  >

    <template v-slot:top-right>
      <div class="q-pa-md q-gutter-sm">
        <q-btn round color="amber"  icon="update" @click="updateSensor" />
        <q-btn
          color="primary"
          icon-right="sensors"
          label="Add Sensor"
          no-caps
          @click="add = true"
        />
      </div>
    </template>



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
            @save="(value) => saveName(value, props.row.macAddress)"
            v-slot="scope" >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
      </q-tr>

      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <SensorTable :sensor-data="props.row.dataStatements" />
        </q-td>
      </q-tr>
    </template>

  </q-table>
</template>

<script>

import SensorTable from "components/sensor/SensorDataTable";
import axios from "axios";
import {serviceApi} from "src/boot";
import {ref} from "vue";
import NewSensorForm from "components/sensor/NewSensorForm";
const headerColumns = [
  {
    name: "mac",
    required: true,
    label: "MAC address",
    align: 'left',
    field: row => row.macAddress,
    sortable: false,
    editable: false
  },
  {
    name: "Name",
    required: true,
    label: "Sensor Name",
    align: 'left',
    field: row => row.name,
    sortable: true,
    editable: true
  },
  {
    name: "Sensor data",
    label: "Sensor data size",
    align: 'center',
    field: row => row.dataStatements.length,
    sortable: true,
    editable: false
  }
];


export default {
  name: "dataSensorTable",
  components: {NewSensorForm, SensorTable},
  props: [
    'sensors',
    'updateSensor',
    'addSensor'
  ],
  methods: {
    saveName(newName, macAddress){
      serviceApi.updateSensorName(newName, macAddress)
        .then((res) => {
          this.$q.notify({
            message: res.message,
            color: res.status ? 'positive' : 'negative',
            icon: 'announcement'
          });
        })
    },
    closeForm(){
      this.add = false;
    }
  },
  setup() {
    return {
      add: ref(false),
      headerColumns,
    }
  }
}
</script>

<style scoped>

</style>
