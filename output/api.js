import axios from "axios";
const endpoint = "https://uapi.inforu.co.il/SendMessageXml.ashx?InforuXML=";
export class InforuProvider {
    config;
    logger;
    init(config, app) {
        this.config = config;
        this.logger = app.fastify.log;
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
        if (!this.config.username || !this.config.password || !this.config.senderName) {
            this.logger.error('Inforu plugin not configured properly. Missing username, password or sender name');
            return;
        }
        const { username, password, senderName } = this.config;
        const xmlBody = `<Inforu>
            <User>
                <Username>${username}</Username>
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
            const response = await axios.post(endpointUrl);
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
//# sourceMappingURL=api.js.map