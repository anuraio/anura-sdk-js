import { AnuraError } from "./AnuraError";

/**
 * Thrown when a 4XX response is returned from the Anura Direct API.
 */
export class AnuraClientError extends AnuraError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "AnuraClientError"; 
  }
 }
