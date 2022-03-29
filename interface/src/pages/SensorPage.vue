<template>
  <q-page>
    <div class="q-pa-md">
      <DataSensorTable
        :sensors="sensors"
        :update-sensor="updateSensor"
        :add-sensor="addSensor" />
    </div>
  </q-page>
</template>

<script>
import {ref} from "vue";
import {serviceApi} from "src/boot";
import DataSensorTable from "components/sensor/SensorTable";

export default {
  name: "SensorPage",
  components: {DataSensorTable},
  methods: {
    updateSensor(){
      serviceApi.getSensor().then(response => this.sensors = response.data);
    },
    addSensor( name, macAddress){
      this.sensors.push({
        macAddress: macAddress,
        name: name,
        dataStatements: []
      });
    },
    callback(){
      this.refTimout = setInterval(() => this.updateSensor(), 6000);
    }
  },
  setup () {
    const sensors = ref([]);
    const refTimout = ref();
    serviceApi.getSensor().then(response => sensors.value = response.data);
    return {
      refTimout,
      sensors
    }
  },
  mounted() {
    this.callback();
  },
  unmounted() {
    clearInterval(this.refTimout);
  }
}

</script>

<style scoped>

</style>
