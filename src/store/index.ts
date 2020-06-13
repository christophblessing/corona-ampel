import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

interface State {
  reproductionNumbers: number[];
  incidenceNumber: number;
  emergencyCapacity: number;
}

const initialState = {
  reproductionNumbers: [0, 0, 0],
  incidenceNumber: 0,
  emergencyCapacity: 0
};

const store = new Vuex.Store({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: {
    fetchRKIData: () => {
      // get real rki data from api
      // ask kurt
    }
  },
  modules: {}
});

export { store, initialState, State };
