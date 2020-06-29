<template>
  <div v-bind:class="getClass"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { STATUS_GREEN, STATUS_AMBER, STATUS_RED } from '../const';

export default Vue.extend({
  props: {
    status: String
  },
  computed: {
    getClass(): string {
      switch (this.status) {
        case STATUS_GREEN:
          return 'light green';
        case STATUS_AMBER:
          return 'light amber';
        case STATUS_RED:
          return 'light red';
        default:
          return 'light';
      }
    }
  }
});
</script>

<style scoped>
.light {
  height: 200px;
  width: 200px;
  line-height: 200px;
  border-radius: 50%;
  background-color: gray;
  margin: 20px;
}

.green {
  background-color: green;
}

.amber {
  background-color: yellow;
}

.red {
  background-color: red;
}
</style>
