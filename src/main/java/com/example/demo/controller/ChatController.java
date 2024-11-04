package com.example.demo.controller;

import com.example.demo.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    /***
     * /sendMessage endpoint is where this endpoint is reading messages from
     * once the endpoint does the processing, it sends the response to /topic/messages
     * where the clients subscribe to
    ***/
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        System.out.println("received message from server:" + message);
        return message;
    }
}