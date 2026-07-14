
const { sendLeadEmail } = require('./lib/email/resend');

async function test() {
  try {
    console.log("Sending email...");
    await sendLeadEmail("shivamsharma@example.com", "example.com", {
      subject: "Test",
      body: "Test body"
    });
    console.log("Done");
  } catch(e) {
    console.error("FAIL:", e);
  }
}
test();
