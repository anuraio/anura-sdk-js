/**
 * Additional Data object used by Anura Direct.
 */
export class AdditionalData {
  private _data: Map<string, string> = new Map();

  /**
   * Adds an element (key/value pair) of additional data.
   * @param {string} key
   * @param {string} value
   */
  public addElement(key: string, value: string) {
    this._data.set(key, value);
  }

  /**
   * Removes an element (key/value pair) from your additional data.
   * @param {string} key The key of the element you would like to remove.
   */
  public removeElement(key: string) {
    this._data.delete(key);
  }

  /**
   * Returns additional data as a JSON string. 
   */
  public toString(): string {
    return JSON.stringify(Object.fromEntries(this._data));
  }

  /**
   * Returns the number elements set within Additional Data. 
   */
  public size(): number {
    return this._data.size;
  }
}
