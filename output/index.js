"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSms = void 0;
exports.default = createPlugin;
const api_1 = __importDefault(require("./api"));
const SendSms = api_1.default.send.bind(api_1.default);
exports.SendSms = SendSms;
class App {
    name = 'tsdiapi-inforu';
    config;
    context;
    constructor(config) {
        this.config = {
            userame: '',
            password: '',
            senderName: '',
            ...config || {},
        };
    }
    async onInit(ctx) {
        this.context = ctx;
        const appConfig = this.context?.config?.appConfig || {};
        const username = this.config.userame || appConfig["INFORU_USERNAME"];
        const password = this.config.password || appConfig["INFORU_PASSWORD"];
        const senderName = this.config.senderName || appConfig["INFORU_SENDER_NAME"];
        this.config.userame = username;
        this.config.password = password;
        this.config.senderName = senderName;
        if (!this.config.userame || !this.config.password || !this.config.senderName) {
            ctx.logger.error('Inforu plugin not configured properly. Missing username, password or sender name');
        }
        api_1.default.init(this.config, ctx.logger);
    }
}
function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map