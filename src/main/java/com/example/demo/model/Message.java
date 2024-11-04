package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {

    private String senderId;
    // text, video, images
    private String dataType;
    private String data;

    public Message(@JsonProperty("senderId") String senderId,
                   @JsonProperty("dataType") String dataType,
                   @JsonProperty("data") String data) {
        this.senderId = senderId;
        this.dataType = dataType;
        this.data = data;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
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
                ", dataType='" + dataType + '\'' +
                ", data='" + data + '\'' +
                '}';
    }
}
