package com.storeManager.mail.impl;

import java.util.Properties;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.storeManager.mail.MailService;
import com.storeManager.utility.MailUtil;
import com.storeManager.utility.ServerCommonConstant;

@Component("mailService")
public class GoogleMailService implements MailService {
	

	@Override
	public Properties getProperties() {
		Properties props =  new Properties();
	    props.put(ServerCommonConstant.MAIL_SMTP_HOST, MailUtil.MAIL_SMTP_HOST);    
        props.put(ServerCommonConstant.MAIL_SMTP_SOCKETFACTORY_PORT,  MailUtil.MAIL_SMTP_SOCKETFACTORY_PORT);    
        props.put(ServerCommonConstant.MAIL_SMTP_SOCKETFACTORY_CLASS, MailUtil.MAIL_SMTP_SOCKETFACTORY_CLASS);      
        props.put(ServerCommonConstant.MAIL_SMTP_AUTH, MailUtil.MAIL_SMTP_AUTH);     
        props.put(ServerCommonConstant.MAIL_SMTP_PORT, MailUtil.MAIL_SMTP_PORT);    
		return props;
	}

	@Override
	public Session getSessionForMail(Properties props) {		
	  Session session = Session.getInstance(props,
		      new javax.mail.Authenticator() {
		         protected PasswordAuthentication getPasswordAuthentication() {		        
						try {
							return new PasswordAuthentication(MailUtil.EMIAL_SENDER ,MailUtil.SENDER_PASSWORD);
						} catch (Exception e) {						
							e.printStackTrace();
							return null;
						}				
		         }
		      });
		return session;
	}
}
