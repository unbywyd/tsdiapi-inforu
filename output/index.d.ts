import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { InforuProvider } from "./api.js";
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
export declare function getInforuProvider(): InforuProvider;
export { InforuProvider };
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map