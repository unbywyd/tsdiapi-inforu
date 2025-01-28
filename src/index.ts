import { AppContext, AppPlugin } from "tsdiapi-server";
import inforu from "./api";

const SendSms = inforu.send;
export { SendSms };

export type PluginOptions = {
    userame: string;
    password: string;
    senderName: string;
}

class App implements AppPlugin {
    name = 'tsdiapi-inforu';
    config: PluginOptions;
    context: AppContext;
    constructor(config?: PluginOptions) {
        this.config = { ...config };
    }

    async onInit(ctx: AppContext) {
        this.context = ctx;
        const appConfig = this.context.config.appConfig || {};

        const username = this.config.userame || appConfig["INFORU_USERNAME"];
        const password = this.config.password || appConfig["INFORU_PASSWORD"];
        const senderName = this.config.senderName || appConfig["INFORU_SENDER_NAME"];
        this.config.userame = username;
        this.config.password = password;
        this.config.senderName = senderName;

        if (!this.config.userame || !this.config.password || !this.config.senderName) {
            ctx.logger.error('Inforu plugin not configured properly. Missing username, password or sender name');
        }

        inforu.init(this.config, ctx.logger);
    }
}

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}