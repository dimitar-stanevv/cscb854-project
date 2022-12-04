const sib = require('sib-api-v3-sdk');
const test = process.env.NETLIFY_EMAILS_SECRET;

exports.handler = async (event, context, callback) => {
  console.log('test: ' + test);
  // Prepare SIB client:
  const client = sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.SIB_API_KEY;
  const emailAPI = new sib.TransactionalEmailsApi();
  const sender = {
    email: 'dimitar.stanev@test.com',
    name: 'Dimitar Stanev',
  };
  return {
    statusCode: 200,
    body: 'key = ' + test
  };
  const data = JSON.parse(event.body);
  try {
    // Send email to recicipent:
    const emailContent = "You are awesome! This is a demo email you have requested 💪";
    emailAPI.sendTransacEmail({
      sender,
      to: [{ email: data.recipient }],
      subject: 'CSCB854 Demo Project',
      textContent: emailContent,
      htmlContent: emailContent,
      params: {
        role: 'Frontend',
      }
    });
    return {
      statusCode: 200,
      body: 'Success'
    };
  } catch (error) {
    console.log('Err', error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message || "An error has occurred"
      })
    };
  }
}
