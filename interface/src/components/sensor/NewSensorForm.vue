<template>
  <q-form
    @submit="sendSensor"
    class="q-gutter-md"
  >

    <q-input
      outlined
      filled
      aria-required="true"
      v-model="form.sensorAddressMac"
      label="macAddress"
      lazy-rules
      :rules="[ val => val && validateMacAddress(val) || 'Please enter a valid mac Address ']"
    />

    <q-input
      outlined
      filled
      v-model="form.sensorName"
      label="sensor Name"
    />

    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script>
import {serviceApi} from "src/boot";

export default {
  name: "NewSensorForm",
  props: ["addSensor","closeForm"],
  data(){
    return {
      form: {
        sensorName: "",
        sensorAddressMac: ""
      }
    }
  },
  methods: {
    validateMacAddress(val){
      const regex = /^([0-9a-f]{2}[:-]){5}([0-9a-f]{2})$/;
      return regex.test(val)
    },
    sendSensor(){
      serviceApi.createSensor(this.form.sensorName, this.form.sensorAddressMac)
      .then((res) => {
        this.$q.notify({
          message: res.message,
          color: res.status ? 'positive' : 'negative',
          icon: 'announcement'
        });
        if(res.status) this.addSensor(this.form.sensorName, this.form.sensorAddressMac)
        this.closeForm()
      })
    }
  }
}
</script>

<style scoped>

</style>
