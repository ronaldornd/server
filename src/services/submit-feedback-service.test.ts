import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to send a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Ta bugando',
            created_at: Date()
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to send a feedback whitout a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Ta bugando',
            created_at: Date()
        })).rejects.toThrow();
    });
    it('should not be able to send a feedback whitout a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            created_at: Date()
        })).rejects.toThrow();
    });
    it('should not be able to send a feedback whit a screenshoot invalid', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Ta bugando!',
            created_at: '12dcvhjhgfdx'
        })).rejects.toThrow();
    });
});