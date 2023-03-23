
const accountSid = "AC0795dca66bf716ca4ec7c3b50a8ec206";
const authToken = "6134b4e1ac59ec5fd737536a44236593";
const client = require("twilio")(accountSid, authToken);

const sendsms = () => {
    client.messages
        .create({ body: "I am Shrey", from: "+15077055480", to: "+917046815902" })
        .then(message => console.log(message.sid));

}


module.exports.sendsms = sendsms;