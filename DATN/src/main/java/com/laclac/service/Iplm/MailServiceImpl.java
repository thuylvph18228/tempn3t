package com.laclac.service.Iplm;

import com.laclac.DTO.MailDto;
import com.laclac.DTO.OrderDto;
import com.laclac.repository.ShopRepository;
import com.laclac.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    ThymeleafService thymeleafService;

    List<MimeMessage> mails = new ArrayList<>();

    @Override
    public void pushMailToQueue(MailDto mailDto, OrderDto orderDto) throws MessagingException {

        String mail = this.shopRepository.findAll().get(0).getEmail();

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        helper.setFrom(mail);
//        helper.setFrom("laclacshop.info@gmail.com");
        helper.setTo(mailDto.getTo());
        helper.setSubject(mailDto.getSubject());
//        helper.setText(mailDto.getBody(), true);
        helper.setText(thymeleafService.getContent(orderDto), true);
        helper.setReplyTo(mail);

        String [] cc = mailDto.getCc();
        if(cc != null && cc.length > 0){
            helper.setCc(cc);
        }

        String [] bcc = mailDto.getBcc();
        if(bcc != null && bcc.length > 0){
            helper.setBcc(bcc);
        }

        List<File> files = mailDto.getFiles();
        if (files != null && files.size() > 0) {
            for (File file : files ) {
                helper.addAttachment(file.getName(), file);
            }
        }
        mails.add(mimeMessage);
    }

    @Override
    public void sendmail(String to, String subject, String body) throws MessagingException {
        String mail = this.shopRepository.findAll().get(0).getEmail();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        helper.setFrom(mail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        helper.setReplyTo(mail);
        javaMailSender.send(mimeMessage);
    }

    @Scheduled(fixedDelay = 2000)
    @Override
    public void sendMailQueue() {
        while (!mails.isEmpty()){
            MimeMessage mimeMessage = mails.remove(0);
            try {
                javaMailSender.send(mimeMessage);
            } catch (Exception e){
                System.out.println(e);
            }
        }
    }
}
