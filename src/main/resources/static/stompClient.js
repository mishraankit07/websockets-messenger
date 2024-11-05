let stompClient = null

function onWebSocketError(error){
    console.error('Error with websocket:', error);
}

function onConnect(frame, showMessage){
    console.log('Socket connection established: ' + frame);
    document.getElementById("status").textContent = "Connected";
    document.getElementById("status").style.color = "green";

    stompClient.subscribe('/topic/messages', function (message) {
        console.log('Message received from broker:' + message.body);
        showMessage(JSON.parse(message.body));
    });
}

function onStompError(frame){
    console.error("Broker reported error: " + frame.headers["message"]);
    document.getElementById("status").textContent = "Connection error";
    document.getElementById("status").style.color = "red";
}

export function publishMessage(jsonMessage, destination){
    stompClient.publish({destination: destination, body: jsonMessage});
}

export function deactivate(){
    stompClient.deactivate();
}

export function activate(showMessage){
   stompClient = new StompJs.Client({brokerURL: 'ws://localhost:8080/gs-guide-websocket'});
   stompClient.onConnect = (frame) => onConnect(frame, showMessage);
   stompClient.onStompError = onStompError;
   stompClient.onWebSocketError = onWebSocketError;
   stompClient.activate();
}

export function isInitialized(){
    return stompClient != null && stompClient.connected
}