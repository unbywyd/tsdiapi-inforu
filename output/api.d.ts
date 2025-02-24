import { PluginOptions } from ".";
import type { Logger } from "winston";
export declare class InforuProvider {
    private config;
    private logger;
    init(config: PluginOptions, logger: Logger): void;
    send(to: string, text: string): Promise<void>;
}
//# sourceMappingURL=api.d.ts.map