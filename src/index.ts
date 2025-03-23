import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { InforuProvider } from "./api.js";
import { FastifyInstance } from 'fastify';

let inforuProvider: InforuProvider | null = null;

declare module "fastify" {
    interface FastifyInstance {
        inforu: InforuProvider;
    }
}

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
            ctx.fastify.log.warn("⚠ Inforu plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const config = ctx.projectConfig;

        this.config.username = config.get("INFORU_USERNAME", this.config.username) as string;
        this.config.password = config.get("INFORU_PASSWORD", this.config.password) as string;
        this.config.senderName = config.get("INFORU_SENDER_NAME", this.config.senderName) as string;

        if (!this.config.username || !this.config.password || !this.config.senderName) {
            ctx.fastify.log.error('Inforu plugin not configured properly. Missing username, password or sender name');
        }

        this.provider.init(this.config, ctx);
        inforuProvider = this.provider;
        ctx.fastify.decorate('inforu', this.provider);
    }
}

export function useInforuProvider(): InforuProvider {
    if (!inforuProvider) {
        throw new Error("❌ Inforu plugin is not initialized. Use createPlugin() in your server context first.");
    }
    return inforuProvider;
}

export { InforuProvider };

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}