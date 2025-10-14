package com.email.writer.app;


import lombok.Data;

//to generate getters setters and constructors
@Data
public class EmailRequest {
    private String emailContent;
    private String tone;

}
