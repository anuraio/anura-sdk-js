import { AdditionalData } from "./AdditionalData";
import { DirectResult } from "./DirectResult";
import { AnuraClientError } from "./errors/AnuraClientError";
import { AnuraError } from "./errors/AnuraError";
import { AnuraServerError } from "./errors/AnuraServerError";

/** Options object for calling getResult() */
export type GetResultOptions = {
  /** The IP address of your visitor. IPv4 and IPv6 addresses are supported. */
  ipAddress: string;
  /** The user agent string of your visitor. */
  userAgent?: string|null;
  /** The application device identifier of your visitor. */
  app?: string|null;
  /** The device identifier of your visitor. */
  device?: string|null;
  /** A variable, declared by you, to identify "source" traffic within Anura's dashboard interface. */
  source?: string|null;
  /** A subset variable of "source," declared by you, to identify "campaign" traffic within Anura's dashboard interface. */
  campaign?: string|null;
  /** Additional Data gives you the ability to pass in select points of data with your direct requests, essentially turning Anura into "your database for transactional data". */
  additionalData?: AdditionalData|null;
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
  private _apiUrl: string = 'https://direct.anura.io/direct.json';

  constructor(instance: string, useHttps: boolean = true) {
    this._instance = instance;
    this._useHttps = useHttps;
    this._apiUrl = useHttps ? 'https://direct.anura.io/direct.json' : 'http://direct.anura.io/direct.json'; 
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

    const additionalData = options.additionalData;
    const hasAdditionalData = !!((additionalData) && (additionalData.size() > 0));
    if (hasAdditionalData) {
      console.log(additionalData.toString());
      requestParams.additional = additionalData.toString();
    }
    
    let response;
    try {
      response = await fetch(this._apiUrl + '?' + new URLSearchParams(requestParams).toString());
    } catch (error) {
      throw new AnuraError(`Failed to fetch: ${error}`);
    }

    let result;
    if (response.ok) {
      try {
        result = await response.json();
      } catch (error: any) {
        throw new AnuraError('Invalid JSON received from Anura Direct.');
      }

      return new DirectResult(
        result.result,
        result.mobile,
        result.rule_sets,
        result.invalid_traffic_type
      );
    } else {
      try {
        result = await response.json();
      } catch (error: any) {
        result = 'Invalid JSON received from Anura Direct.';
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
  }

  get instance(): string {
    return this._instance;
  }

  set instance(instance: string) {
    this._instance = instance;
  }

  get useHttps(): boolean {
    return this._useHttps;
  }

  set useHttps(useHttps: boolean) {
    this._useHttps = useHttps;
    this._apiUrl = useHttps ? 'https://direct.anura.io/direct.json' : 'http://direct.anura.io/direct.json'; 
  }
}