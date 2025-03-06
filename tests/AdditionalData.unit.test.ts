import { AdditionalData } from '../src/direct/AdditionalData';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Additional data', () => {
  let additionalData: AdditionalData;

  beforeEach(() => {
    additionalData = new AdditionalData();
  })

  it('shoud initialize as empty', () => {
    expect(additionalData.size()).toBe(0); 
  })

  it('should be able to add a new element', () => {
    additionalData.addElement(1, 'test-value');
    expect(additionalData.size()).toBe(1);
  });

  it('should be able to remove additional data', () => {
    additionalData.addElement(1, 'first-value');
    additionalData.addElement(2, 'second-value');
    additionalData.addElement(3, 'third-value');

    additionalData.removeElement(2);
    expect(additionalData.size()).toBe(2);
  });

  it('should stringify correctly', () => {
    additionalData.addElement(1, 'first-value');
    additionalData.addElement(2, 'second-value');

    expect(additionalData.toString()).toEqual(
      `{"1":"first-value","2":"second-value"}`
    );
  })
});