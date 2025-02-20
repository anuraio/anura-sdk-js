# Anura SDK for JavaScript (Node.js)
The **Anura SDK for JavaScript (Node.js)** makes it easy for developers to utilize Anura Direct within their JavaScript code, and begin analyzing their traffic. You can get started in minutes by installing the SDK from [npm](https://www.npmjs.com/).

## Getting Started
1. **Have an open active account with Anura**. You an see more about Anura's offerings [here.](https://www.anura.io/product#plans-pricing)
2. **Minimum Requirements** - To use the SDK, you will need **Node >=18**.
3. **Install the SDK**
4. View our [**Quick Examples**](#quick-examples) to immediately begin using the SDK!

## Installing the SDK
You can install the SDK with `npm` by running the following:
```sh
npm install @anuraio/anura-sdk
```

## Quick Examples

### Create the Anura Direct Client
```javascript
import { AnuraDirect, AdditionalData, AnuraClientError, AnuraServerError } from '@anuraio/anura-sdk'; // ESModule Import
const { AnuraDirect, AdditionalData, AnuraClientError, AnuraServerError } = require('@anuraio/anura-sdk'); // CommonJS Import

const direct = new AnuraDirect('your-instance');
```

### Set additional data for Anura Direct
```javascript
/**
 * To send additional data to Anura Direct, use the AdditionalData class. 
 * We will provide this object when calling direct.getResult()
 */
const additionalData = new AdditionalData();
additionalData.addElement('1', 'your-data-value');
```

### Updating additional data at a specific index
```javascript
/**
 * To update an element of additional data at a specific index,
 * simply add the element again but with a new value.
 */
const indexToUpdate = '1';
additionalData.addElement(indexToUpdate, 'your-new-data-value');
```

### Removing an element from additional data
```javascript
const indexToRemove = '1';
additionalData.removeElement(indexToRemove);
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
      source: 'your-source-value', // optional
      campaign: 'your-campaign-value', //optional
      additionalData: additionalData, //optional
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
  - `AnuraClientError`: Thrown if a 4XX response is returned from Anura Direct
  - `AnuraServerError`: Thrown if a 5XX response is returned from Anura Direct
  - `AnuraError`: General exception that represents any other type of error that occurred while fetching from Anura Direct.

  `GetResultOptions` Parameters:
  | Name | Type | Description | Required |
  | ---- | ---- | ----------- | -------- |
  | `ipAddress` | `string` | The IP address of your visitor. Both IPv4 & IPv6 addresses are supported. | Yes |
  | `userAgent` | `string\|null` | The user agent string of your visitor |  |
  | `app` | `string\|null` | The application package identifier of your visitor (when available.) | |
  | `device` | `string\|null` | The device identifer of your visitor (when available.) | |
  | `source` | `string\|null` | A variable, declared by you, to identify "source" traffic within Anura's dashboard interface. | |
  | `campaign` | `string\|null` | A subset variable of "source," declared by you, to identify "campaign" traffic within Anura's dashboard interface. | |
  | `additionalData`| `AdditionalData\|null` | Additional Data gives you the ability to pass in select points of data with your direct requests, essentially turning Anura into "your database for transactional data". | |

**`get instance(): string`**
- Returns the instance you have set within the `AnuraDirect` client.

**`set instance(instance: string): void`**
- Sets the Instance ID of the `AnuraDirect` client to the `instance` value passed.

**`get useHttps(): boolean`**
- Returns whether or you're currently using the **HTTPS** when calling the Anura Direct API. If false, you are using **HTTP** instead.

**`set useHttps(useHttps: boolean): void`**
- Sets whether to use **HTTPS** or **HTTP** according to the `useHttps` value passed.

### AdditionalData
An object used for sending [additional data](https://docs.anura.io/integration/additional-data) to Anura Direct.

### Methods
**`addElement(key: string, value: string): void`**
- Adds an element of data to your `AdditionalData`.

**`removeElement(key: string): void`**
- Removes the element of data located at the provided `key` from your `AdditionalData`.

**`toString(): string`**
- Returns your `AdditionalData` as a JSON string.

**`size(): number`**
- Returns the number of elements currently set within your `AdditionalData`

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