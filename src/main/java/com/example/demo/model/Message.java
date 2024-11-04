package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {

    private String senderId;
    private String receiverId;
    // text, video, images
    private String dataType;
    private String data;

    public Message(){
    }

    public Message(@JsonProperty("senderId") String senderId,
                   @JsonProperty("receiverId") String receiverId,
                   @JsonProperty("dataType") String dataType,
                   @JsonProperty("data") String data) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.dataType = dataType;
        this.data = data;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Message{" +
                "senderId='" + senderId + '\'' +
                ", receiverId='" + receiverId + '\'' +
                ", dataType='" + dataType + '\'' +
                ", data='" + data + '\'' +
                '}';
    }
}
