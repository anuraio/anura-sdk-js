/**
 * Base error class for Anura SDK.
 */
export class AnuraError extends Error {
    constructor(message: string) {
      super(message);
      this.message = message;
      this.name = "AnuraError";
    }
   }