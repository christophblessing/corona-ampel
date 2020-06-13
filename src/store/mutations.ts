export default {
  updateRepNumber: (state: any, payload: number) => {
    state.reproductionNumbers.unshift(payload);
    state.reproductionNumbers.pop();
  },
  updateIncidenceNumber: (state: any, payload: number) => {
    state.incidenceNumber = payload;
  },
  updateEmergencyCapacity: (state: any, payload: number) => {
    state.emergencyCapacity = payload;
  }
};
