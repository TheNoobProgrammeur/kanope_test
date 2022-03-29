<template>
  <div>
    <apexchart
      width="400"
      height="100%"
      type="area"
      :options="options"
      :series="series" />
  </div>
</template>

<script>

export default {
  name: "SensorChart",
  props: ["sensorTable"],
  data(){
    return {
    options: {
      tooltip: {
        x: {
          format: 'dd/MM HH:mm:ss'
        }
      },
      chart: {
        id: 'Sensor Trace',
      },
      xaxis: {
        type: 'datetime',
      }
    },
      series: this.sensorTable.map((sensor) => {
        return {
          name: `${sensor.macAddress}`,
          data: sensor.sensorHistoryTrace.map((trace) => {
            const date = new Date(trace.time);
            return [
              date.getTime(),
              trace.rssi
            ]
          })
        }
      }),
    }
  }
}
</script>

<style scoped>

</style>
