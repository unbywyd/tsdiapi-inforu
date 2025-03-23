import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { InforuProvider } from "./api.js";
declare module "fastify" {
    interface FastifyInstance {
        inforu: InforuProvider;
    }
}
export type PluginOptions = {
    username: string;
    password: string;
    senderName: string;
};
declare class App implements AppPlugin {
    name: string;
    config: PluginOptions;
    context: AppContext;
    provider: InforuProvider;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export declare function useInforuProvider(): InforuProvider;
export { InforuProvider };
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map