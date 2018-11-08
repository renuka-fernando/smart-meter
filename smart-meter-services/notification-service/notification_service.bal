import ballerina/http;
import ballerina/config;
import ballerina/log;
import ballerina/jms;

endpoint http:Listener listener {
    port: 9100
};

endpoint jms:SimpleQueueReceiver consumerEndpoint {
    initialContextFactory:"org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl:"tcp://localhost:61616",
    acknowledgementMode:"AUTO_ACKNOWLEDGE",
    queueName:"notifications"
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
            string messageText => log:printInfo("Message : " + messageText);
            error e => log:printError("Error occurred while reading message",
                                       err=e);
        }
    }
}

service<http:Service> notificationService bind listener {
    sendSms (endpoint caller, http:Request request) {
        http:Request twilioRequest = new;
        twilioRequest.setPayload("From=%2B19852383148&To=%2B94766678752&Body=Hello Ballerina!");
        twilioRequest.setHeader("Content-type","application/x-www-form-urlencoded");

        var response = twilioEp->post("/", twilioRequest);
        match response {
            http:Response resp => {
                _ = caller->respond(resp);
            }
            error err=> {
                http:Response resp = new;
                resp.setPayload(err.message);
                _ = caller->respond(resp);
            }
        }
    }
}