import emailTemplates from './emailTemplates/index';

const {
  confirmAccountTemplate,
  passwordRecoveryTemplate,
  tripRequestTemplate,
  tripFeedbackTemplate,
} = emailTemplates;

let html;
const emailTemplatesFunction = (category, data) => {
  switch (category) {
    case 'confirmAccount':
      html = confirmAccountTemplate(data);
      return {
        subject: 'Confirm your Email Account',
        html,
      };
    case 'passwordRecovery':
      html = passwordRecoveryTemplate(data);
      return {
        subject: 'Recover your password',
        html,
      };
    case 'tripRequest':
      html = tripRequestTemplate(data);
      return {
        subject: 'New Trip Request',
        html,
      };
    case 'tripFeedback':
      html = tripFeedbackTemplate(data);
      return {
        subject: 'Feedback for your trip request',
        html,
      };
    default:
      return false;
  }
};

export default emailTemplatesFunction;
