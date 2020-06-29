import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('Status calculated from r values', () => {
  const wrapper: any = shallowMount(App);
  it('returns green status if every value is under the threshold', () => {
    const rValues = [1.0, 1.0, 1.0];
    const expectedStatus = 'green';

    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(expectedStatus);
  });

  it('returns green status if one value is the amber threshold', () => {
    const rValues = [1.2, 1.2, 1.1];
    const expectedStatus = 'green';

    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(expectedStatus);
  });

  it('returns green status even if value is red threshold', () => {
    const rValues = [2.0, 1.2, 1.1];
    const expectedStatus = 'green';

    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(expectedStatus);
  });

  it('returns amber status with r value 3 times in a row over amber threshold', () => {
    const rValues = [1.2, 1.2, 1.2];
    const expectedStatus = 'amber';

    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(expectedStatus);
  });

  it('returns amber status if value is over red threshold, but not three times in a row', () => {
    const rValues = [1.3, 1.3, 1.2];
    const expectedStatus = 'amber';

    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(expectedStatus);
  });

  it('returns red status with values 3 times over ref threshold', () => {
    const rValues = [1.3, 1.3, 1.3];
    const expectedStatus = 'red';

    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(expectedStatus);
  });
});
