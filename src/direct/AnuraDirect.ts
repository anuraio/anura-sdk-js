import { DirectResult } from "./DirectResult";
import { AnuraClientError } from "./errors/AnuraClientError";
import { AnuraError } from "./errors/AnuraError";
import { DirectRequestParams } from "./types";
import { AnuraServerError } from "./errors/AnuraServerError";

/**
 * An API client for Anura Direct.
 */
export class AnuraDirect {
  private _instance: string = '';
  private _source: string = '';
  private _campaign: string = '';
  private _useHttps: boolean = true;
  private _additionalData: any = {};

  constructor(instance: string, useHttps: boolean = true) {
    this._instance = instance;
    this._useHttps = useHttps;
  }

  /**
   * Gets a result from Anura Direct.
   * @param {string} ipAddress The IP address of your visitor. IPv4 and IPv6 addresses are supported.
   * @param {string} [userAgent] The user agent string of your visitor.
   * @param {string} [app] The application device identifier of your visitor.
   * @param {string} [device] The device identifier of your visitor.
   * @returns {Promise<DirectResult>} A result of the assessed visitor.
   */
  async getResult(ipAddress: string, userAgent?: string, app?: string, device?: string): Promise<DirectResult> {
    const params: DirectRequestParams = {
      instance: this._instance,
      ip: ipAddress
    };

    if (userAgent) params.ua = userAgent;
    if (this._source) params.source = this._source;
    if (this._campaign) params.campaign = this._campaign;
    if (app) params.app = app;
    if (device) params.device = device;

    const hasAdditionalData = Object.keys(this._additionalData).length > 0;
    if (hasAdditionalData) {
      params.additional = JSON.stringify(this._additionalData);
    }

    const apiUrl = this._getApiUrl();
    const response = await fetch(apiUrl + '?' + new URLSearchParams(params).toString());
    if (response.ok) {
      try {
        const result = await response.json();
        return new DirectResult(
          result.result,
          result.mobile,
          result.rule_sets,
          result.invalid_traffic_type
        );
      } catch (error: any) {
      }
    }

    if (!response.ok) {
      let result;
      try {
        result = await response.json();
      } catch (error: any) {
        result = 'Invalid JSON received.';
      }

      const error = result.error ?? result;
      if (response.status >= 400 && response.status <= 499) {
        throw new AnuraClientError(error);
      } else if (response.status >= 500 && response.status <= 599) {
        throw new AnuraServerError(error);
      } else {
        throw new AnuraError(error);
      }
    }

    try {
      return await response.json();
    } catch (error: any) {
      throw new AnuraError('Invalid JSON received.');
    }
  }

  /**
   * Adds an element (key/value pair) of additional data.
   * @param {string} key
   * @param {string} value 
   */
  addAdditionalData(key: string, value: string): void {
    this._additionalData[key] = value;
  }

  /**
   * Removes an element (key/value pair) from your additional data. 
   * @param {string} key The key of the element you would like to remove.
   */
  removeAdditionalData(key: string): void {
    delete this._additionalData[key];
  }

  private _getApiUrl(): string {
    return (this._useHttps) ? 'https://direct.anura.io/direct.json' : 'http://direct.anura.io/direct.json';
  }

  get instance(): string {
    return this._instance;
  }

  set instance(instance: string) {
    this._instance = instance;
  }

  get source(): string {
    return this._source;
  }

  set source(source: string) {
    this._source = source;
  }

  get campaign(): string {
    return this._campaign;
  }

  set campaign(campaign: string) {
    this._campaign = campaign;
  }

  get additionalData(): any {
    return this._additionalData;
  }
}