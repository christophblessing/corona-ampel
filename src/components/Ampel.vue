<template>
  <div class="box">
    <div v-bind:class="getClassTop"></div>
    <div v-bind:class="getClassMiddle"></div>
    <div v-bind:class="getClassBottom"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { STATUS_GREEN, STATUS_AMBER, STATUS_RED } from '../const';

export default Vue.extend({
  props: {
    status: String
  },
  computed: {
    getClassTop(): string {
      if (this.status === STATUS_RED) {
        return 'light red';
      }
      return 'light';
    },
    getClassMiddle(): string {
      if (this.status === STATUS_AMBER) {
        return 'light amber';
      }
      return 'light';
    },
    getClassBottom(): string {
      if (this.status === STATUS_GREEN) {
        return 'light green';
      }
      return 'light';
    }
  }
});
</script>

<style scoped>
.box {
  border: 2px solid darkgray;
  background-color: black;
  width: 60px;
}

.light {
  height: 50px;
  width: 50px;
  line-height: 200px;
  border-radius: 50%;
  background-color: gray;
  margin: 5px;
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
