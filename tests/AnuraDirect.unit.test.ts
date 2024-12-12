import { AnuraDirect } from '../src/direct/AnuraDirect';

describe('AnuraDirect client', () => {
  it('should be able to add additional data', () => {
    const direct = new AnuraDirect('');
    direct.addAdditionalData('1', 'test-value');

    expect(direct.additionalData).toStrictEqual({
      '1': 'test-value'
    });
  });

  it('should be able to remove additional data', () => {
    const direct = new AnuraDirect('');

    direct.addAdditionalData('1', 'first-value');
    direct.addAdditionalData('2', 'second-value');
    direct.addAdditionalData('3', 'third-value');

    direct.removeAdditionalData('2');
    expect(direct.additionalData).toStrictEqual({
      '1': 'first-value',
      '3': 'third-value'
    });
  });
});