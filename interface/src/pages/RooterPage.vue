<template>
  <q-page>
    <div class="q-pa-md">
      <RooterTable :rooter="rooters" />
    </div>
  </q-page>
</template>

<script>
import {ref} from "vue";
import {serviceApi} from "src/boot";
import RooterTable from "components/rooter/RooterTable";

export default {
  name: "RooterPage",
  components: {RooterTable},
  methods: {
    updateRooter(){
      serviceApi.getRooter().then(response => this.rooters = response.data);
    },
    callback(){
      this.refTimout = setInterval(() => this.updateRooter(), 6000);
    }
  },
  setup(){
    const rooters = ref([])
    const refTimout = ref();
    serviceApi.getRooter().then(response => rooters.value = response.data);
    return {
      rooters,
      refTimout
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
