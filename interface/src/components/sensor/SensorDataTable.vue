<template>

  <q-table
    title="Sensor Data"
    :rows="sensorData"
    :columns="dataSensorsColumns"
    row-key="_id"
  >
  </q-table>

</template>

<script>

const dataSensorsColumns = [
  {
    name: "date",
    label: "Date",
    align: 'left',
    field: row => new Date(row.date),
    format: val => `${val.toLocaleDateString()}
     ${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`,
    sortable: true
  },
  {
    name: "temperatureOne",
    label: "Temperature 1 LM75",
    align: 'center',
    field: row => row.data.tempOne,
    format: val => `${val} °C`,
    sortable: true
  },
  {
    name: "temperatureOne",
    label: "Temperature 2 BME",
    align: 'center',
    field: row => row.data.tempTwo,
    format: val => `${val} °C`,
    sortable: true
  },
  {
    name: "humidity",
    label: "Relative humidity",
    align: 'center',
    field: row => row.data.humidity,
    format: val => `${val} %`,
    sortable: true
  },
  {
    name: "air",
    label: "Air pressure",
    align: 'center',
    field: row => row.data.airPressure,
    format: val => `${val} hPa`,
    sortable: true
  }
]


export default {
  name: "SensorTable",
  props: ["sensorData"],
  setup(){
    return {
      dataSensorsColumns,
    }
  }
}
</script>

<style scoped>

</style>
