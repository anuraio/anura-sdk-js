/**
 * Represents a visitor assessment that is returned from the Anura Direct API.
 */
export class DirectResult {
    private readonly _result: string;
    private readonly _mobile: number|null;
    private readonly _ruleSets: string[]|null;
    private readonly _invalidTrafficType: string|null;

    constructor(result: string, mobile?: number|null, ruleSets?: string[]|null, invalidTrafficType?: string|null) {
        this._result = result ?? '';
        this._mobile = mobile ?? null;
        this._ruleSets = ruleSets ?? null;
        this._invalidTrafficType = invalidTrafficType ?? null;
    }

    /**
     * Returns whether the visitor is deemed to be suspect.
     * @returns {boolean} whether the visitor is suspect.
     */
    public isSuspect(): boolean {
        return this._result === 'suspect';
    }

    /**
     * Returns whether the visitor is deemed to be non-suspect.
     * @returns {boolean} whether the visitor is non-suspect.
     */
    public isNonSuspect(): boolean {
        return this._result === 'non-suspect';
    }

    /**
     * Returns whether the visitor is deemed to be from a mobile device.
     * @returns {boolean} whether the visitor was from a mobile device.
     */
    public isMobile(): boolean {
        return this._mobile === 1;
    }

    get result(): string {
        return this._result;
    }

    get mobile(): number|null {
        return this._mobile;
    }
    
    /**
     * Getting rule sets requires "return rule sets" to be enabled. You can reach out to support to have rule sets returned.
     * The returned value will be null on non-suspect results and/or if you have "return rule sets" disabled. 
     */
    get ruleSets(): string[]|null {
        return this._ruleSets
    }

    /**
     * Getting invalid traffic type requires "return invalid traffic type" to be enabled. You can reach out to support to have invalid traffic type returned.
     * The returned value will be null on non-suspect results and/or if you have "return invalid traffic type" disabled. 
     */
    get invalidTrafficType(): string|null {
        return this._invalidTrafficType;
    }
}