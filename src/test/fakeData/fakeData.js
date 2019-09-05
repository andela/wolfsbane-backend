const email = 'appropriatemail@gmail.com';
const token = 'xxxxxx';
const firstName = 'Samson';
const url = `https://barefootnomad.herokuapp.com/testURL/${token}`;
const tripDetails = `
<tbody>
<tr><td>Nairobi</td><td>Lagos</td><td>20th Nov, 2019</td><td>Bootcamp Facilitation</td><td>Amity Campus</td></tr>
<tr><td>Lagos</td><td>Nairobi</td><td>10th Dec, 2019</td><td>Return trip</td><td>The Dojo</td></tr>
</tbody>
`;
const manager = 'Okwokwe';
const requester = 'Samson Samuel';
const status = 'Approved';
const comment = 'Ensure to return on stated date as you will be involve in onsite interview the week after';


const fakeData = {
  firstName,
  category: 'confirmAccount',
  token,
  email,
  tripDetails,
  status,
  comment,
  manager,
  requester,
  data: {
    firstName, url, manager, requester, tripDetails, status, comment
  },
};

export default fakeData;
