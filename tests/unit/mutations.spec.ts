import mutations from "../../src/store/mutations";
import { State } from "../../src/store/index";
describe("Mutation ", () => {
  let state: State;

  beforeEach(() => {
    state = {
      reproductionNumbers: [0, 0, 0],
      incidenceNumber: 0,
      emergencyCapacity: 0
    };
  });
  it("updateRepNumber sets new incidence values first in first out", () => {
    mutations.updateRepNumber(state, 0.1);
    mutations.updateRepNumber(state, 0.2);
    mutations.updateRepNumber(state, 0.3);
    mutations.updateRepNumber(state, 0.4);
    expect(state).toEqual({
      reproductionNumbers: [0.4, 0.3, 0.2],
      incidenceNumber: 0,
      emergencyCapacity: 0
    });
  });

  it("updateIncidenceNumber sets new incidenceNumber", () => {
    mutations.updateIncidenceNumber(state, 1);
    const expectedState = {
      reproductionNumbers: [0, 0, 0],
      incidenceNumber: 1,
      emergencyCapacity: 0
    };
    expect(state).toEqual(expectedState);
  });

  it("updateEmergencyCapacity sets new emergencyCapacity", () => {
    mutations.updateEmergencyCapacity(state, 1);
    const expectedState = {
      reproductionNumbers: [0, 0, 0],
      incidenceNumber: 0,
      emergencyCapacity: 1
    };
    expect(state).toEqual(expectedState);
  });
});
