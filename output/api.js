"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const endpoint = "https://uapi.inforu.co.il/SendMessageXml.ashx?InforuXML=";
class InforuConfig {
    config;
    logger;
    init(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    async send(to, text) {
        if (!text) {
            this.logger.error('Cannot send empty SMS');
            return;
        }
        if (!to) {
            this.logger.error('Cannot send SMS without a recipient');
            return;
        }
        if (!this.config.userame || !this.config.password || !this.config.senderName) {
            this.logger.error('Inforu plugin not configured properly. Missing username, password or sender name');
            return;
        }
        const { userame, password, senderName } = this.config;
        const xmlBody = `<Inforu>
            <User>
                <Username>${userame}</Username>
                <Password>${password}</Password>
            </User>
            <Content Type="sms">
                <Message>${text}</Message>
            </Content>
            <Recipients>
                <PhoneNumber>${to}</PhoneNumber>
            </Recipients>
            <Settings>
                <Sender>${senderName}</Sender>
            </Settings>
        </Inforu>`;
        try {
            const endpointUrl = encodeURI(endpoint + xmlBody);
            this.logger.info(`Sending SMS to ${to}...`);
            this.logger.debug(`Endpoint: ${endpointUrl}`);
            this.logger.debug(`Payload: ${xmlBody}`);
            const response = await axios_1.default.post(endpointUrl);
            if (response.status === 200) {
                this.logger.info(`SMS sent successfully to number: ${to}`);
            }
            else {
                this.logger.error(`Failed to send SMS to number: ${to}. Response status: ${response.status}`);
            }
        }
        catch (error) {
            this.logger.error(`Error sending SMS to number: ${to}. Details: ${error.message}`);
            this.logger.debug(`Error stack: ${error.stack}`);
        }
    }
}
const inforu = new InforuConfig();
exports.default = inforu;
//# sourceMappingURL=api.js.map