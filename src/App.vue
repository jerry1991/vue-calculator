<template>
  <div id="app" class="app-container">
      <v-calculator />
  </div>
</template>

<script>
import Vue from 'vue'
import Component from "vue-class-component"
import Calculator from "@/components/Calculator"


@Component({
  components: {
    'v-calculator': Calculator
  }
})
class App extends Vue {}

export default App;
</script>

<style lang="scss">
@import "style/reset.scss";
</style>

