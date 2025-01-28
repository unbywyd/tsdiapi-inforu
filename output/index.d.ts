import { AppContext, AppPlugin } from "tsdiapi-server";
declare const SendSms: (to: string, text: string) => Promise<void>;
export { SendSms };
export type PluginOptions = {
    userame: string;
    password: string;
    senderName: string;
};
declare class App implements AppPlugin {
    name: string;
    config: PluginOptions;
    context: AppContext;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map