import { AnuraError } from "./AnuraError";

/**
 * Thrown when a 5XX response is returned from the Anura Direct API.
 */
export class AnuraServerError extends AnuraError {
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = "AnuraServerError";
      }
}