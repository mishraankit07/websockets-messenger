This is a group chat based application created using websockets
where the backend is written in Java Spring boot and client side code is written in native html css and javascript.

The images and video files uploaded by a client are stored in an AWS S3 bucket for lower latency and better performance
during communication and faster rendering on the client side.

to run the application on your machine:

prerequisite: you need docker installed in your system

project setup:
1. pull the image: docker pull anky008/socket-messenger:1.0

2. run the container: docker run -p 8080:8080 anky008/socket-messenger:1.0

3. head to localhost:8080/ for the running application.


demo: [![Watch the video](https://drive.google.com/uc?export=view&id=1TU_OAhjEcfaGiHEOozOK4nkja-B3eJ_z)](https://drive.google.com/file/d/1D0N8bICBwJcqZ5wkGy20z7eRCc2oqdtj/view?usp=sharing)
