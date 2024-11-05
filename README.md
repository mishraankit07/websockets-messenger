This is a group chat based application created using websockets
where the backend is written in Java Spring boot and client side code is written in native html css and javascript.

The images and video files uploaded by a client are stored in an AWS S3 bucket for lower latency and better performance
during communication and faster rendering on the client side.

to run the application on your machine

you need docker installed in your system

pull the image
docker pull anky008/socket-messenger:1.0

run the container
docker run -p 8080:8080 anky008/socket-messenger:1.0

head to localhost:8080/ for the running application.