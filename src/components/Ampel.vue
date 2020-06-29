<template>
  <div v-bind:class="getClass"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    status: String
  },
  computed: {
    getClass(): string {
      switch (this.status) {
        case 'green':
          return 'light green';
        case 'amber':
          return 'light amber';
        case 'red':
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
