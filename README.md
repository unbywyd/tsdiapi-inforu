# **TSDIAPI-Inforu Plugin**

TSDIAPI-Inforu is a plugin for the **TSDIAPI framework** that enables seamless integration with the **Inforu SMS service**. It allows you to send SMS messages directly from your application with **minimal configuration**.

---

## **Features**
✅ **Send SMS Messages** – Easily send SMS using the **Inforu** service.  
✅ **Environment-Based Configuration** – Load credentials via `.env` or directly in the plugin.  
✅ **Global Provider Access** – Use the SMS provider **from anywhere** in your app.  
✅ **Integrated Logging** – All actions are logged using **TSDIAPI’s logging system**.  

---

## **Installation**

### Install via NPM
```bash
npm install @tsdiapi/inforu
```

### Or Use the CLI
```bash
tsdiapi plugins add inforu
```

---

## **Usage**

### **Registering the Plugin in TSDIAPI**

Add the plugin to your **TSDIAPI server** configuration:

```typescript
import { createApp } from "@tsdiapi/server";
import createPlugin from "@tsdiapi/inforu";

createApp({
  plugins: [
    createPlugin({
      username: "your-inforu-username", // Or use INFORU_USERNAME from ENV
      password: "your-inforu-password", // Or use INFORU_PASSWORD from ENV
      senderName: "your-sender-name",   // Or use INFORU_SENDER_NAME from ENV
    }),
  ],
});
```

---

### **Alternative Configuration via ENV**
Instead of passing options in the code, you can **configure the plugin using environment variables**:

```env
INFORU_USERNAME=your-inforu-username
INFORU_PASSWORD=your-inforu-password
INFORU_SENDER_NAME=your-sender-name
```

If these ENV variables are set, you can **initialize the plugin without parameters**:

```typescript
import { createApp } from "@tsdiapi/server";
import createPlugin from "@tsdiapi/inforu";

createApp({
  plugins: [createPlugin()],
});
```

---

## **Sending SMS Messages**

After initialization, you can send SMS messages **from anywhere** in your application using the global provider.

### **Option 1: Using `getInforuProvider()`**
```typescript
import { getInforuProvider } from "@tsdiapi/inforu";

const inforu = getInforuProvider();
await inforu.sendSms("+972123456789", "Hello, this is a test message!");
```

### **Option 2: Using the Direct Function**
If a global provider is initialized, you can send SMS like this:
```typescript
import { getInforuProvider } from "@tsdiapi/inforu";

await getInforuProvider().sendSms("+972123456789", "Hello from Inforu!");
```

> **Note:** Ensure that the plugin is registered before calling `getInforuProvider()`.

---

## **Standalone Usage (Without TSDIAPI)**

You can also use the plugin **independently** as an ES module:

```typescript
import { InforuProvider } from "@tsdiapi/inforu";
import { Logger } from "winston"; // Any logging system

const provider = new InforuProvider();

provider.init(
  {
    username: "your-username",
    password: "your-password",
    senderName: "your-sender-name",
  },
  console as unknown as Logger
);

await provider.sendSms("+972123456789", "Standalone SMS test");
```

---

## **Why Use TSDIAPI-Inforu?**
✔ **Easy integration** with **Inforu SMS API**.  
✔ **Supports both plugin-based and standalone usage**.  
✔ **Global access** via `getInforuProvider()`.  
✔ **Environment variable support** for better security.  

---

## **License**
This plugin is licensed under the **MIT License**.

---

## **Issues and Contributions**
If you encounter any issues or have feature requests, **feel free to open an issue** or contribute to the repository. 🚀