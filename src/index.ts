import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { InforuProvider } from "./api";

let inforuProvider: InforuProvider | null = null;

export type PluginOptions = {
    username: string;
    password: string;
    senderName: string;
}

class App implements AppPlugin {
    name = 'tsdiapi-inforu';
    config: PluginOptions;
    context: AppContext;
    provider: InforuProvider;
    constructor(config?: PluginOptions) {
        this.config = {
            username: '',
            password: '',
            senderName: '',
            ...config || {},
        };
        this.provider = new InforuProvider();
    }

    async onInit(ctx: AppContext) {
        if (inforuProvider) {
            ctx.logger.warn("⚠ Inforu plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const appConfig = this.context?.config?.appConfig || {};

        const username = this.config.username || appConfig["INFORU_USERNAME"];
        const password = this.config.password || appConfig["INFORU_PASSWORD"];
        const senderName = this.config.senderName || appConfig["INFORU_SENDER_NAME"];
        this.config.username = username;
        this.config.password = password;
        this.config.senderName = senderName;

        if (!this.config.username || !this.config.password || !this.config.senderName) {
            ctx.logger.error('Inforu plugin not configured properly. Missing username, password or sender name');
        }

        this.provider.init(this.config, ctx.logger);
        inforuProvider = this.provider;
        ctx.logger.info("✅ Inforu plugin initialized successfully.");
    }
}

export function getInforuProvider(): InforuProvider {
    if (!inforuProvider) {
        throw new Error("❌ Inforu plugin is not initialized. Use createPlugin() in your server context first.");
    }
    return inforuProvider;
}

export { InforuProvider };

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}