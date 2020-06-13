export default {
  getReproductionNumber: (state: any): Array<number> => {
    return state.reproductionNumbers;
  },
  getIncidenceNumber: (state: any): number => {
    return state.incidenceNumber;
  },
  getEmergencyCapacity: (state: any): number => {
    return state.emergencyCapacity;
  }
};
