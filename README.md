# Anura SDK for JavaScript
The **Anura SDK for JavaScript** makes it easy for developers to utilize Anura Direct within their JavaScript code, and begin analyzing their traffic. You can get started in minutes by installing the SDK from [npm](https://www.npmjs.com/).

## Getting Started
1. **Have an open active account with Anura**. You an see more about Anura's offerings [here.](https://www.anura.io/product#plans-pricing)
2. **Minimum Requirements** - To use the SDK, you will need **Node >=18**.
3. **Install the SDK**
4. View our [**Quick Examples**](#quick-examples) to immediately begin using the SDK!

## Installing the SDK

## Quick Examples

### Create the Anura Direct Client
```javascript
import { AnuraDirect, AnuraClientError, AnuraServerError } from '@anuraio/anura-sdk'; // ESModule Import
const { AnuraDirect, AnuraClientError, AnuraServerError } = require('@anuraio/anura-sdk'); // CommonJS Import

const direct = new AnuraDirect('your-instance');
```

### Set additional data for Anura Direct
```javascript
direct.addAdditionalData('1', 'your-data-value');
```

### Updating additional data at a specific index
```javascript
/**
 * To update an element of additional data at a specific index,
 * simply add the element again but with a new value.
 */
const indexToUpdate = '1';
direct.addAdditionalData(indexToUpdate, 'your-new-data-value');
```

### Removing an element from additional data
```javascript
const indexToRemove = '1';
direct.removeAdditionalData(indexToRemove);
```

### Get a result from Anura Direct
```javascript
(async function() {
  const direct = new AnuraDirect('your-instance-id');
  try {
    const result = await direct.getResult({
      ipAddress: 'visitors-ip-address',
      userAgent: 'visitors-user-agent', // optional
      app: 'visitors-app-package-id', //optional
      device: 'visitors-device-id', // optional
      source: 'your-source-value', //optional
      campaign: 'your-campaign-value' //optional
    });

    console.log(result);
  } catch (error) {
      if (error instanceof AnuraClientError) {
        // Handle 4XX responses here.
      } else if (error instanceof AnuraServerError) {
        // Handle 5XX responses here.
      } else {
        // Handle any other type of error thrown here.
      }
  }
})();
```

## API Reference
### AnuraDirect
Can get results from Anura Direct. These results are fetched during Direct's `/direct.json` API endpoint.

#### Methods
**`async getResult(options: GetResultOptions): Promise<DirectResult>`**
- Gets a result from Anura Direct. Throws an exception if an error was received from Anura Direct.
- Exceptions thrown:
  - `AnuraClientException`: Thrown if a 4XX response is returned from Amnura Direct
  - `AnuraServerException`: Thrown if a 5XX response is returned from Anura Direct
  - `AnuraException`: General exception that represents any other type of error that occurred while fetching from Anura Direct.

  `GetResultOptions` Parameters:
  | Name | Type | Description | Required |
  | ---- | ---- | ----------- | -------- |
  | `ipAddress` | `string` | The IP address of your visitor. Both IPv4 & IPv6 addresses are supported. | Yes |
  | `userAgent` | `string` | The user agent string of your visitor |  |
  | `app` | `string` | The application package identifier of your visitor (when available.) | |
  | `device` | `string` | The device identifer of your visitor (when available.) | |
  | `source` | `any` | A variable, declared by you, to identify "source" traffic within Anura's dashboard interface. | |
  | `campaign` | `any` | A subset variable of "source," declared by you, to identify "campaign" traffic within Anura's dashboard interface. | |

**`addAdditionalData(key: string, value: string): void`**
- Adds an element of additional data to your `AnuraDirect` client.

**`removeAdditionalData(key: string): void`**
- Removes the element of your additional data array located at the provided `key`.

**`get instance(): string`**
- Returns the instance you have set within the `AnuraDirect` client.

**`get additionalData(): Map<string,string>`**
- Returns the additional data you have set witin the `AnuraDirect` client

**`set instance(instance: string): void`**
- Sets the Instance ID of the `AnuraDirect` client to the `instance` value passed.

### DirectResult
The result upon a successful call to `getResult()` from the `AnuraDirect` client. It contains not only the result from Anura Direct, but some other methods to help you use the result as well.

#### Methods
**`isSuspect(): boolean`**
- Returns whether or not the visitor has been determined to be **suspect**.

**`isNonSuspect(): boolean`**
- Returns whether or not the visitor as been determined to be **non-suspect**.

**`isMobile(): boolean`**
- Returns whether or  not the visitor has been determined to be on a mobile device.

**`get result(): string`**
- Returns the raw result string value.

**`get mobile(): number|null`**
- Returns the raw mobile result value.

**`get ruleSets(): string[]|null`**
- If you have **return rule sets** enabled, you will be able to see which specific rules were violated upon a **suspect** result. This value will be null if the visitor is **non-suspect**, or if you do not have **return rule sets enabled**.
- You can talk to [support](mailto:support@anura.io) about enabling or disabling the return rule sets feature.

**`get invalidTrafficType(): string|null`**
- If you have **return invalid traffic type** enabled, you will be able to access which type of invalid traffic occurred upon a **suspect** result.
- You can talk to [support](mailto:support@anura.io) about enabling or disabling the return invalid traffic type feature.