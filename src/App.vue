<template>
  <div id="app">
    <div>
      <Ampel v-bind:status="statusReproductionNumberAmpel" />
      <h2>1. Der R-Wert</h2>
      <input
        type="number"
        min="0"
        step="0.1"
        value="0"
        v-model.number="newRepoductionNumber"
      />
      <button @click="submitReproductionNumber">Eintragen</button>
      <p>R-Werte: {{ this.reproductionNumbers }}</p>
      <p>
        Unterhalb eines R-Wertes von 1.1 steht die Ampel auf Grün. Ist der
        R-Wert drei Mal in Folge höher als 1.1, springt der Status der Ampel auf
        Gelb. Liegt der R-Wert drei Mal in Folge über 1.2, so ist der Status der
        Ampel rot.
      </p>
    </div>

    <div>
      <Ampel v-bind:status="statusIncidenceAmpel" />
      <h2>
        2. Zahl der Neuinfektionen pro 100.000 Einwohner*innen
      </h2>
      <input
        type="number"
        min="0"
        v-model.number="this.incidenceNumber"
        @change="changeIncidenceNumber"
      />
      <p>
        Sofern die Zahl der Neuinfektionen unter 20 innerhalb der sieben
        vergangenen Tage liegt, ist die Ampel grün. Über 20 wird die Ampel gelb.
        Ab einem Wert von 30 schaltet sie auf rot.
      </p>
    </div>

    <div>
      <Ampel v-bind:status="statusEmergencyAmpel" />
      <h2>
        3. Anteil benötigter Plätze auf Intensivstationen
      </h2>
      <p>Auslastung Intensivbetten: {{ this.emergencyCapacity }} %</p>
      <input
        id="inputEmergency"
        v-model="emergencyCapacity"
        v-on:input="changeEmergencyCapacity"
        type="range"
        min="0"
        max="100"
      />
      <p>
        Solange der Anteil der Covid-19-Patient*innen unter 15 Prozent liegt,
        ist dieser Teil der Ampel grün. Gelb wird die Ampel bei einem Wert über
        15 Prozent. Ist der Anteil größer als 25 Prozent, schaltet die Ampel auf
        Rot.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { store } from './store/index';
import Ampel from './components/Ampel.vue';
import { STATUS_GREEN, STATUS_AMBER, STATUS_RED } from './const';

export default Vue.extend({
  name: 'App',
  store: store,
  components: {
    Ampel
  },
  methods: {
    changeEmergencyCapacity: function(event: any) {
      const emergencyCapacity = Number.parseInt(event.currentTarget.value);
      store.commit('updateEmergencyCapacity', emergencyCapacity);
    },
    changeIncidenceNumber: function(event: any) {
      const incidenceNumber = Number.parseInt(event.currentTarget.value);
      store.commit('updateIncidenceNumber', incidenceNumber);
    },
    submitReproductionNumber: function() {
      store.commit('updateRepNumber', this.newRepoductionNumber);
    },
    getStatusFromRValues: (values: number[]): string => {
      let status = STATUS_GREEN;

      if (values.every((value: number) => value > 1.2)) {
        status = STATUS_RED;
      } else if (values.every((value: number) => value > 1.1)) {
        status = STATUS_AMBER;
      }

      return status;
    }
  },
  data: function() {
    return {
      newRepoductionNumber: 0
    };
  },
  computed: {
    ...mapState([
      'reproductionNumbers',
      'incidenceNumber',
      'emergencyCapacity'
    ]),
    statusReproductionNumberAmpel: function(): string {
      const rValues = store.state.reproductionNumbers;
      return this.getStatusFromRValues(rValues);
    },
    statusIncidenceAmpel: () => {
      if (store.state.incidenceNumber < 20) {
        return STATUS_GREEN;
      } else if (
        store.state.incidenceNumber >= 20 &&
        store.state.incidenceNumber < 30
      ) {
        return STATUS_AMBER;
      } else {
        return STATUS_RED;
      }
    },
    statusEmergencyAmpel: () => {
      if (store.state.emergencyCapacity < 15) {
        return STATUS_GREEN;
      } else if (
        store.state.emergencyCapacity >= 15 &&
        store.state.emergencyCapacity <= 25
      ) {
        return STATUS_AMBER;
      } else {
        return STATUS_RED;
      }
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

p {
  margin-right: 40px;
}

h2 {
  margin-right: 20px;
}
</style>
