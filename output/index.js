import { InforuProvider } from "./api.js";
let inforuProvider = null;
class App {
    name = 'tsdiapi-inforu';
    config;
    context;
    provider;
    constructor(config) {
        this.config = {
            username: '',
            password: '',
            senderName: '',
            ...config || {},
        };
        this.provider = new InforuProvider();
    }
    async onInit(ctx) {
        if (inforuProvider) {
            ctx.fastify.log.warn("⚠ Inforu plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const config = ctx.projectConfig;
        this.config.username = config.get("INFORU_USERNAME", this.config.username);
        this.config.password = config.get("INFORU_PASSWORD", this.config.password);
        this.config.senderName = config.get("INFORU_SENDER_NAME", this.config.senderName);
        if (!this.config.username || !this.config.password || !this.config.senderName) {
            ctx.fastify.log.error('Inforu plugin not configured properly. Missing username, password or sender name');
        }
        this.provider.init(this.config, ctx);
        inforuProvider = this.provider;
        ctx.fastify.decorate('inforu', this.provider);
    }
}
export function useInforuProvider() {
    if (!inforuProvider) {
        throw new Error("❌ Inforu plugin is not initialized. Use createPlugin() in your server context first.");
    }
    return inforuProvider;
}
export { InforuProvider };
export default function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map