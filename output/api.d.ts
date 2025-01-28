import { PluginOptions } from ".";
import type { Logger } from "winston";
declare class InforuConfig {
    private config;
    private logger;
    init(config: PluginOptions, logger: Logger): void;
    send(to: string, text: string): Promise<void>;
}
declare const inforu: InforuConfig;
export default inforu;
//# sourceMappingURL=api.d.ts.map