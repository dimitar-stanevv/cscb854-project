const sib = require('sib-api-v3-sdk');
const sibKey = process.env.NETLIFY_EMAILS_SECRET;

exports.handler = async (event, context, callback) => {
  // Prepare SIB client:
  const client = sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = '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';
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
