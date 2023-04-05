package com.n3t.service;

import com.n3t.DTO.MailDto;
import com.n3t.DTO.OrderDto;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public interface MailService {
    void pushMailToQueue(MailDto mailDto, OrderDto orderDto) throws MessagingException;
    void sendmail(String to, String subject, String body) throws MessagingException;

    void sendMailQueue();
}
