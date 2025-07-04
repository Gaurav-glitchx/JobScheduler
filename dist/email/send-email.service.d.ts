export declare class SendEmailService {
    private readonly logger;
    private readonly transporter;
    handle(metadata: any): Promise<{
        success: boolean;
        to: any;
        subject: any;
        messageId: string;
    }>;
}
