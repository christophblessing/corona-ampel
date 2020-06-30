<template>
  <div>
    <Ampel :status="statusIncidenceAmpel" />
    <h2>{{ headline }}</h2>
    <input
      type="number"
      min="0"
      :value="incidenceNumber"
      @change="changeIncidenceNumber"
    />
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Ampel from './Ampel.vue';
import { STATUS_GREEN, STATUS_AMBER, STATUS_RED } from '@/const';

const IncidenceComponentProps = Vue.extend({
  props: {
    incidenceNumbers: Array
  }
});

@Component({
  components: {
    Ampel
  }
})
export default class IncidenceComponent extends IncidenceComponentProps {
  @Prop() private incidenceNumber!: number;

  headline = '2. Zahl der Neuinfektionen pro 100.000 Einwohner*innen';
  text = `Sofern die Zahl der Neuinfektionen unter 20 innerhalb der sieben
      vergangenen Tage liegt, ist die Ampel grün. Über 20 wird die Ampel gelb.
      Ab einem Wert von 30 schaltet sie auf rot.`;

  get statusIncidenceAmpel(): string {
    if (this.incidenceNumber < 20) {
      return STATUS_GREEN;
    } else if (this.incidenceNumber >= 20 && this.incidenceNumber < 30) {
      return STATUS_AMBER;
    } else {
      return STATUS_RED;
    }
  }

  changeIncidenceNumber(event: any): void {
    const incidenceNumber = Number.parseInt(event.currentTarget.value);
    this.$emit('changeIncidenceNumber', incidenceNumber);
  }
}
</script>
