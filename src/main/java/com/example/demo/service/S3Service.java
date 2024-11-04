package com.example.demo.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.InputStream;
import java.util.List;

@Service
public class S3Service {

    private final AmazonS3 s3Client;
    private final String bucketName;

    public S3Service(@Value("${aws.credentials.access-key}") String accessKey,
                     @Value("${aws.credentials.secret-key}") String secretKey,
                     @Value("${aws.s3.bucket}") String bucketName,
                     @Value("${aws.region}") String region) {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        this.s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withRegion(region)
                .build();
        this.bucketName = bucketName;
    }

    public String uploadFile(String keyName, InputStream inputStream, ObjectMetadata metadata) {
        s3Client.putObject(bucketName, keyName, inputStream, metadata);
        return s3Client.getUrl(bucketName, keyName).toString();
    }

    public List<String> listFiles() {
        return s3Client.listObjects(bucketName).getObjectSummaries()
                .stream()
                .map(s3Object -> s3Object.getKey())
                .toList();
    }

    public InputStream downloadFile(String keyName) {
        return s3Client.getObject(bucketName, keyName).getObjectContent();
    }
}
