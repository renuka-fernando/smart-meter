import ballerina/http;
import ballerina/config;
import ballerina/log;
import ballerina/jms;

endpoint jms:SimpleQueueReceiver consumerEndpoint {
    initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl: "tcp://localhost:61616",
    acknowledgementMode: "AUTO_ACKNOWLEDGE",
    queueName: "notifications"
};

endpoint http:Client twilioEp {
    url: "https://api.twilio.com/2010-04-01/Accounts/" + config:getAsString("twilio.username") + "/Messages.json",
    auth: {
        scheme: http:BASIC_AUTH,
        username: config:getAsString("twilio.username"),
        password: config:getAsString("twilio.password")
    }
};

service<jms:Consumer> jmsListener bind consumerEndpoint {
    onMessage(endpoint consumer, jms:Message message) {
        match (message.getTextMessageContent()) {
            string messageText => {
                log:printInfo("Message : " + messageText);
                sendSms(untaint messageText, "766678752");
            }
            error e => log:printError("Error occurred while reading message",
                err = e);
        }
    }
}

function sendSms(string message, string clientNumber) {
    http:Request twilioRequest = new;
    twilioRequest.setPayload("From=%2B19852383148&To=%2B94" + clientNumber + "&Body=\n" + message + ".");
    twilioRequest.setHeader("Content-type", "application/x-www-form-urlencoded");

    var response = twilioEp->post("/", twilioRequest);
    match response {
        http:Response resp => {
            var js = resp.getJsonPayload();
            match js {
                json msg => {
                    log:printInfo(msg.toString());
                }
                error err => {
                    log:printError(err.message);
                }
            }
            log:printInfo("Message sent to: " + clientNumber);
        }
        error err => {
            log:printError(err.message);
        }
    }
}