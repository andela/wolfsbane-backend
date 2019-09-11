import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { emailTemplatesFunction } from '../utils';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Creates an instance of sendMail.
 *
 * @constructor
 * @param {string} receiver The desired email addres of the recipient.
 * @param {string} category Either of 'confirmAccount', 'passwordRecovery', or 'tripRequest'.
 * @param {object} data Information about the user.
 * @param {string} data.firstName The first name of the requester.
 * @param {string} data.url The URL to be passed as string.
 * @param {string} data.manager The first name of the manager to approve request
 * @param {string} data.requester The full names of the trip requester
 * @param {string} data.tripDetails Stringnified Tabled-body of trip details
 * e.g const tripDetails = `
 * <tbody>
 * <tr><td>Nairobi</td><td>Lagos</td><td>20th Nov, 2019</td>
 * <td>Bootcamp Facilitation</td><td>Amity Campus</td></tr>
 * <tr><td>Lagos</td><td>Nairobi</td><td>10th Dec, 2019</td>
 * <td>Return trip</td><td>The Dojo</td></tr>
 * </tbody>
 * `;
 * @param {string} data.status The status of the requested trip,
 * should be either of 'Approved', 'Reviewed', or 'Rejected'.
 * @param {string} data.comment The comment made by the manager regarding the status of the trip
 * @returns {Object} e.g. {success: true, message: 'Email sent successfully'}
 *  or {success: false, error: 'Unauthorised'}
 */


const sendEmail = async (receiver, category, data) => {
  try {
    const retrievedData = emailTemplatesFunction(category, data);
    const {
      html,
      subject
    } = retrievedData;
    const msg = {
      to: receiver,
      from: 'wolfsbane@barefootnomad.herokuapp.com',
      subject,
      html,
    };

    const result = await sgMail.send(msg);
    if (result[0] && result[0].request) {
      return { success: true, message: 'Email sent successfully' };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export default sendEmail;
