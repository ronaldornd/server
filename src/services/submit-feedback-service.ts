import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repository/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string,
    comment: string,
    created_at: string
}
export class SubmitFeedbackService {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }
    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, created_at } = request;

        if (!type) {
            throw new Error('Type is required');
        }
        if (!comment) {
            throw new Error('comment is required');
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            created_at
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size 16px; color: #111;">`,
                `<p>Tipo de Feedback: ${type}<p/>`,
                `<p>Comentário: ${comment}<p/>`,
                `<div/>`
            ].join(`\n`)
        })
    }
}