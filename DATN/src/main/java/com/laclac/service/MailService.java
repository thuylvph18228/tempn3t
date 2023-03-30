package com.laclac.service;

import com.laclac.DTO.MailDto;
import com.laclac.DTO.OrderDto;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public interface MailService {
    void pushMailToQueue(MailDto mailDto, OrderDto orderDto) throws MessagingException;
    void sendmail(String to, String subject, String body) throws MessagingException;

    void sendMailQueue();
}
