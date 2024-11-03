package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {

//    private String senderId;
//    private String receiverId;
//    private String messageType;
    private String name;

    public Message(@JsonProperty("name") String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Message{" +
                "name='" + name + '\'' +
                '}';
    }
}
