import { PluginOptions } from "./index.js";
import { AppContext } from "@tsdiapi/server";
export declare class InforuProvider {
    private config;
    private logger;
    init(config: PluginOptions, app: AppContext): void;
    send(to: string, text: string): Promise<void>;
}
//# sourceMappingURL=api.d.ts.map