"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SendEmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("../common/config");
let SendEmailService = SendEmailService_1 = class SendEmailService {
    logger = new common_1.Logger(SendEmailService_1.name);
    transporter = nodemailer.createTransport({
        host: config_1.config.smtp.host,
        port: config_1.config.smtp.port,
        auth: {
            user: config_1.config.smtp.user,
            pass: config_1.config.smtp.pass,
        },
    });
    async handle(metadata) {
        const to = metadata?.to;
        const subject = metadata?.subject;
        const body = metadata?.body || '';
        if (!to || !subject) {
            this.logger.error('Missing required email fields: to or subject');
            throw new common_1.BadRequestException('Missing required email fields: to or subject');
        }
        try {
            const info = await this.transporter.sendMail({
                from: config_1.config.smtp.from,
                to,
                subject,
                text: body,
            });
            this.logger.log(`Email sent to ${to} successfully. MessageId: ${info.messageId}`);
            return { success: true, to, subject, messageId: info.messageId };
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error.message}`);
            throw new common_1.BadRequestException('Failed to send email: ' + error.message);
        }
    }
};
exports.SendEmailService = SendEmailService;
exports.SendEmailService = SendEmailService = SendEmailService_1 = __decorate([
    (0, common_1.Injectable)()
], SendEmailService);
//# sourceMappingURL=send-email.service.js.map