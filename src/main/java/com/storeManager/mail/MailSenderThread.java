package com.storeManager.mail;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;

import com.storeManager.entity.OrderItem;
import com.storeManager.utility.MailUtil;
import com.storeManager.utility.PropertyUtil;
import com.storeManager.utility.ServerCommonConstant;

public class MailSenderThread implements Runnable{
	
	private OrderItem orderItem = null;
	private MimeMessage mailMessage =null;
	
	@Autowired
	private MailService mailService;
	
	public MailSenderThread(OrderItem orderItem) {
		this.orderItem = orderItem;
	}
	
	@Override
	public void run() {
			System.out.println("7");
			try {
				this.sendMail();
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

	private void sendMail() throws Exception {
		try{
			if(orderItem !=null){
				mailMessage = getMailMessageForOrderCreateEdit();					
			}			
			System.out.println("5");				
			Transport.send(mailMessage);
			System.out.println("6");
			} catch (AddressException addressException) {
				String message = "Failed to send mail. Wrongly Formatted Address Encountered";
				addressException.printStackTrace();
				throw new Exception("AddressException: " + message, addressException);
			} catch (MessagingException messagingException) {
				String message = "Failed to send mail.";			
				throw new Exception("MessagingException: " + message, messagingException);
			} catch (UnsupportedEncodingException unsupportedEncodingException) {
				String message = "Failed to send mail. ";	
				throw new Exception("UnsupportedEncodingException: " + message, unsupportedEncodingException);
			} catch(Exception e){
				e.printStackTrace();
			}
		
		
	}

	private MimeMessage getMailMessageForOrderCreateEdit() throws UnsupportedEncodingException, MessagingException {
		Properties props =mailService.getProperties();
		Session session = mailService.getSessionForMail(props);
		MimeMessage mailMessage = new MimeMessage(session);
		String recepientStr = PropertyUtil.getProperty(ServerCommonConstant.RECEPIENT_EMAIL+orderItem.getStatus());
		if (recepientStr != null) {
			for (String recipient : recepientStr.split(",")) {				
			String[] email =recipient.split("::");
				InternetAddress toAddress = new InternetAddress(email[2],email[0]);
				mailMessage.addRecipient(MailUtil.getMessageRecipientType(email[1]), toAddress);
			}
		}
		if(MailUtil.EMIAL_SENDER !=null){
			String[] email =MailUtil.EMIAL_SENDER.split("::");
			InternetAddress fromAddress = new InternetAddress(email[2],email[0]);
			mailMessage.setFrom(fromAddress);
		}else{
			 throw new AddressException("sender invalid ");
		}
		
		String subject ="New Order-";
		
		mailMessage.setSubject(subject);
		String txtMessage = "<html><head></head><body> <br/> Store Name: ";
		if(orderItem.getTitle()!=null){
			String[] titleStr =orderItem.getTitle().split("-");
			subject+=orderItem.getTitle();
			txtMessage+=titleStr[1]+"<br/> Zone Name: "+titleStr[0]+"<br/> Delivery Date:"+titleStr[2];
		}
				
		txtMessage+= "</body></html>";		
		mailMessage.setText(txtMessage);
		
	/*	Multipart mp;
		for (MailAttachment mailAttachment : mail.getAttachments()) {
			MimeBodyPart attachment = MailUtil.getAttachmentBodyPart(mailAttachment);
			mp.addBodyPart(attachment);
		}
		MimeBodyPart html = null;
		if (mail.getHtmlBody() != null) {
			html = MailUtil.getHTMLBodyPart(mail.getHtmlBody());
			mp.addBodyPart(html);
		}
		mailMessage.setContent(mp);*/
		return mailMessage;
	}
}
