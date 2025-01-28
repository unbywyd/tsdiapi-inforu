# TSDIAPI-Inforu Plugin

TSDIAPI-Inforu is a plugin for the TSDIAPI framework that provides seamless integration with the Inforu SMS service. It allows you to send SMS messages directly from your application with minimal configuration.

---

## Features

- **SMS Sending**: Easily send SMS messages using the Inforu service.
- **Configuration via ENV**: Load credentials and sender details from environment variables or plugin configuration.
- **Integrated Logging**: Logs success or failure of SMS sending using the TSDIAPI logging system.

---

## Installation

Install the plugin via NPM:

```bash
npm install tsdiapi-inforu
```

## Usage

### Register the Plugin

Add the plugin to your TSDIAPI server configuration:

```typescript
import { createApp } from "tsdiapi-server";
import createPlugin from "tsdiapi-inforu";

createApp({
  plugins: [
    createPlugin({
      userame: "your-inforu-username", // Or INFORU_USERNAME in ENV
      password: "your-inforu-password", // Or INFORU_PASSWORD in ENV
      senderName: "your-sender-name", // Or INFORU_SENDER_NAME in ENV
    }),
  ],
});
```

### Alternative Configuration via ENV

You can also configure the plugin using environment variables:

- `INFORU_USERNAME`: Your Inforu username.
- `INFORU_PASSWORD`: Your Inforu password.
- `INFORU_SENDER_NAME`: The sender name to be used in SMS.

If the ENV variables are set, you can initialize the plugin without passing the configuration:

```typescript
import { createApp } from "tsdiapi-server";
import createPlugin from "tsdiapi-inforu";

createApp({
  plugins: [createPlugin()],
});
```

---

## Sending SMS

You can use the `SendSms` function to send SMS messages from anywhere in your application:

```typescript
import { SendSms } from "tsdiapi-inforu";

await SendSms("+1234567890", "Hello, this is a test message!");
```

---

## License

This plugin is licensed under the MIT License.

---

## Issues and Contributions

If you encounter any issues or have feature requests, feel free to open an issue or contribute to the repository.
