import { shallowMount } from '@vue/test-utils';
import { Wrapper } from '@vue/test-utils';
import App from '@/App.vue';
import { STATUS_GREEN, STATUS_AMBER, STATUS_RED } from '@/const';

const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(App);

describe('Status calculated from r values', () => {
  it('returns green status if every value is under the threshold', () => {
    const rValues = [1.0, 1.0, 1.0];
    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(STATUS_GREEN);
  });

  it('returns green status if one value is the amber threshold', () => {
    const rValues = [1.2, 1.2, 1.1];
    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(STATUS_GREEN);
  });

  it('returns green status even if value is red threshold', () => {
    const rValues = [2.0, 1.2, 1.1];
    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(STATUS_GREEN);
  });

  it('returns amber status with r value 3 times in a row over amber threshold', () => {
    const rValues = [1.2, 1.2, 1.2];
    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(STATUS_AMBER);
  });

  it('returns amber status if value is over red threshold, but not three times in a row', () => {
    const rValues = [1.3, 1.3, 1.2];
    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(STATUS_AMBER);
  });

  it('returns red status with values 3 times over ref threshold', () => {
    const rValues = [1.3, 1.3, 1.3];
    expect(wrapper.vm.getStatusFromRValues(rValues)).toEqual(STATUS_RED);
  });
});
