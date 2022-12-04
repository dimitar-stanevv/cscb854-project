const sib = require('sib-api-v3-sdk');
const sibKey = process.env.NETLIFY_EMAILS_SECRET;

exports.handler = async (event, context, callback) => {
  // Prepare SIB client:
  const client = sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = sibKey;
  const emailAPI = new sib.TransactionalEmailsApi();
  const sender = {
    email: 'dimitar.stanev@test.com',
    name: 'Dimitar Stanev',
  };
  const data = JSON.parse(event.body);
  try {
    // Send email to recicipent:
    const emailContent = "You are awesome! This is a demo email you have requested 💪";
    await emailAPI.sendTransacEmail({
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
    console.log('Error', error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message || "An error has occurred"
      })
    };
  }
}
