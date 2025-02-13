import { DirectResult } from "./DirectResult";
import { AnuraClientError } from "./errors/AnuraClientError";
import { AnuraError } from "./errors/AnuraError";
import { AnuraServerError } from "./errors/AnuraServerError";

/** GetResult options for calling the AnuraDirect API */
type GetResultOptions = {
  /** The IP address of your visitor. IPv4 and IPv6 addresses are supported. */
  ipAddress: string;
  /** The user agent string of your visitor. */
  userAgent?: any;
  /** The application device identifier of your visitor. */
  app?: any;
  /** The device identifier of your visitor. */
  device?: any;
  /** A variable, declared by you, to identify "source" traffic within Anura's dashboard interface. */
  source?: any;
  /** A subset variable of "source," declared by you, to identify "campaign" traffic within Anura's dashboard interface. */
  campaign?: any;
}

type DirectRequestParams = {
  instance: string;
  ip: string;
  source?: string;
  campaign?: string;
  ua?: string;
  app?: string;
  device?: string;
  additional?: string;
};


/**
 * An API client for Anura Direct.
 */
export class AnuraDirect {
  private _instance: string = '';
  private _useHttps: boolean = true;
  private _additionalData: any = {};

  constructor(instance: string, useHttps: boolean = true) {
    this._instance = instance;
    this._useHttps = useHttps;
  }

  /**
   * Gets a result from Anura Direct.
   * @param options - Get result options
   * @returns {Promise<DirectResult>} A result of the assessed visitor.
   */
  async getResult(options: GetResultOptions): Promise<DirectResult> {
    const requestParams: DirectRequestParams = {
      instance: this._instance,
      ip: options.ipAddress
    };

    if (options.userAgent) requestParams.ua = options.userAgent;
    if (options.source) requestParams.source = options.source;
    if (options.campaign) requestParams.campaign = options.campaign;
    if (options.app) requestParams.app = options.app;
    if (options.device) requestParams.device = options.device;

    const hasAdditionalData = Object.keys(this._additionalData).length > 0;
    if (hasAdditionalData) {
      requestParams.additional = JSON.stringify(this._additionalData);
    }

    const apiUrl = this._getApiUrl();
    const response = await fetch(apiUrl + '?' + new URLSearchParams(requestParams).toString());
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
        throw new AnuraError('Invalid JSON received');
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

  get additionalData(): any {
    return this._additionalData;
  }
}