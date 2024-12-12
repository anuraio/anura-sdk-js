import { AnuraDirect } from "../src/direct/AnuraDirect";

describe('AnuraDirect client', () => {
  it('throws an error if the instance ID is empty', async() => {
    const direct = new AnuraDirect('');
    await expect(direct.getResult('127.0.0.1')).rejects.toThrow('Instance not specified');
  });

  it('throws an error if the instance ID is invalid', async() => {
    const direct = new AnuraDirect('invalid-instance');
    await expect(direct.getResult('127.0.0.1')).rejects.toThrow('Instance not found');
  });
});