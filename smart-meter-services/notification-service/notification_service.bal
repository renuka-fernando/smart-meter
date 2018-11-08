import ballerina/http;
import ballerina/config;

endpoint http:Listener listener {
    port: 9090
};


endpoint http:Client twilioEp {
    url: "https://api.twilio.com/2010-04-01/Accounts/" + config:getAsString("twilio.username") + "/Messages.json",
    auth: {
        scheme: http:BASIC_AUTH,
        username: config:getAsString("twilio.username"),
        password: config:getAsString("twilio.password")
    }
};

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