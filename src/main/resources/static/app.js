document.getElementById("connectBtn").addEventListener("click", connect);
document.getElementById("disconnectBtn").addEventListener("click", disconnect);
document.getElementById("sendBtn").addEventListener("click", sendMessage);

const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.onConnect = function (frame) {
        console.log('Connected: ' + frame);
        document.getElementById("status").textContent = "Connected";
        document.getElementById("status").style.color = "green";

        stompClient.subscribe('/topic/messages', function (message) {
           console.log('Got the message: ' + JSON.parse(message.body));
           showMessage(JSON.parse(message.body));
        });
    };

    stompClient.onStompError = function (frame) {
        console.error("Broker reported error: " + frame.headers["message"]);
        document.getElementById("status").textContent = "Connection error";
        document.getElementById("status").style.color = "red";
    };

    stompClient.activate();
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.deactivate();
        console.log('Disconnected');
        document.getElementById("status").textContent = "Disconnected";
        document.getElementById("status").style.color = "red";
    }
}

function sendMessage() {

    if (!stompClient || !stompClient.connected) {
        alert("Please connect to the WebSocket server first.");
        return;
    }

    const textMessage = document.getElementById("textMessage").value;
    const fileInput = document.getElementById("fileInput").files[0];

    if(fileInput){
        uploadFile(fileInput);
    } else if(textMessage) {
        const message = {
            senderId: "User1",
            receiverId: "User2",
            dataType: "text",
            data: textMessage
        }

        stompClient.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify(message)
        });

        document.getElementById("textMessage").value = "";
    }
}

async function uploadFile(file) {

    const formData = new FormData();
    formData.append('file', file);

    try {
        const apiResponse = await fetch('http://localhost:8080/api/s3/upload', {
            method: 'POST',
            body: formData
        });

        const data = await apiResponse.text();
        const json = JSON.parse(data);

        console.log('response from backend while uploading data:' + json.message + " " + json.resourceUrl);

        try {
            const message = {
                    senderId: "User1",
                    receiverId: "User2",
                    dataType: file.type.startsWith("image") ? "image" : "video",
                    data: json.resourceUrl
                };

            stompClient.publish({destination: "/app/sendMessage", body: JSON.stringify(message)});
            document.getElementById("fileInput").value = "";

        } catch (error) {
            console.error("Error publishing message to sockets:" + error);
        }
    } catch (error) {
        console.error('Error uploading file:', error)
    }
}

function showMessage(message) {

    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");

    if (message.dataType === "text") {
        messageElement.innerText = `${message.senderId}: ${message.data}`;
    }

    else if (message.dataType === "image") {
        const img = new Image();
        img.src = message.data;
        img.style.maxWidth = "200px";
        img.alt = message.filename || "Image";
        messageElement.appendChild(img);
    }

    else if (message.dataType === "video") {
        const video = document.createElement("video");
        video.controls = true;
        video.src = message.data;
        video.style.maxWidth = "200px";
        messageElement.appendChild(video);
    }

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}