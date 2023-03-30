package com.laclac.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MailDto {

    private String from;

    private String to;

    private String [] cc;

    private String [] bcc;

    private String subject;

    private String body;

    private List<File> files = new ArrayList<>();
}
