import { isInitialized, activate, deactivate, publishMessage } from './stompClient.js';

document.getElementById("connectBtn").addEventListener("click", connect);
document.getElementById("disconnectBtn").addEventListener("click", disconnect);
document.getElementById("sendBtn").addEventListener("click", sendMessage);

function connect() {
    activate(showMessage);
 }

function disconnect() {
    if (isInitialized()) {
        deactivate();
        console.log('Disconnected web socket connection');
        document.getElementById("status").textContent = "Disconnected";
        document.getElementById("status").style.color = "red";
    }
}

function sendMessage() {
    if (!isInitialized()) {
        alert("Please connect to the WebSocket server first");
        return;
    }

    const textMessage = document.getElementById("textMessage").value;
    const fileInput = document.getElementById("fileInput").files[0];
    const username = document.getElementById("usernameInput").value || "Anonymous";

    if (fileInput) {
        uploadFile(fileInput, username);
    }
    else if (textMessage) {
        const message = {
            senderId: username,
            dataType: "text",
            data: textMessage
        };

        publishMessage(JSON.stringify(message), "/app/sendMessage")
        document.getElementById("textMessage").value = "";
   }
}

async function uploadFile(file, username) {

    loadingSpinner.style.display = "block";
    const formData = new FormData();
    formData.append('file', file);

    try {
        const apiResponse = await fetch('http://localhost:8080/api/s3/upload', {
            method: 'POST',
            body: formData
        });

        const data = await apiResponse.text();
        const json = JSON.parse(data);

        console.log('resource details after uploading to s3:' + data);

        try {
            const message = {
                senderId: username,
                dataType: file.type.startsWith("image") ? "image" : "video",
                data: json.resourceUrl
            };

            publishMessage(JSON.stringify(message), "/app/sendMessage")
            document.getElementById("fileInput").value = "";
        } catch (error) {
            console.error("Error publishing message to sockets:" + error);
        }
    } catch (error) {
        console.error('Error uploading file to S3:', error);
    } finally {
        loadingSpinner.style.display = "none";
    }
}

function showMessage(message) {
    const messagesDiv = document.getElementById("messages");

    const messageElement = document.createElement("div");
    messageElement.className = "message-box";

    const senderElement = document.createElement("strong");
    senderElement.innerText = `${message.senderId}`;
    messageElement.appendChild(senderElement);

    if (message.dataType === "text") {
        const textNode = document.createTextNode(message.data);
        messageElement.appendChild(textNode);
    } else if (message.dataType === "image") {
        const img = new Image();
        img.src = message.data;
        img.style.maxWidth = "200px";
        img.alt = message.filename || "Image";
        messageElement.appendChild(img);
    } else if (message.dataType === "video") {
        const video = document.createElement("video");
        video.controls = true;
        video.src = message.data;
        video.style.maxWidth = "200px";
        messageElement.appendChild(video);
    }

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}