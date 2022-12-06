const sib = require('sib-api-v3-sdk');
const sibKey = process.env.NETLIFY_EMAILS_SECRET;

exports.handler = async (event, context, callback) => {
  const recipient = JSON.parse(event.body).recipient;
  const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(recipient);
  if (!emailIsValid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid recipient e-mail supplied'
      })
    };
  }
  // Prepare SIB client:
  const client = sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = sibKey;
  const emailAPI = new sib.TransactionalEmailsApi();
  const sender = {
    email: 'dimitar.stanev@test.com',
    name: 'Dimitar Stanev',
  };
  try {
    // Send email to recicipent:
    const emailContent = "You are awesome! This is a demo email you have requested 💪";
    await emailAPI.sendTransacEmail({
      sender,
      to: [{ email: recipient }],
      subject: 'CSCB854 Demo Project',
      textContent: emailContent,
      htmlContent: emailContent,
      params: {
        role: 'Frontend',
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully!'
      })
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message || "An error has occurred"
      })
    };
  }
}
