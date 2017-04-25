package com.storeManager.mail.impl;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Component;

import com.storeManager.mail.MailAddress;
import com.storeManager.mail.MailAttachment;
import com.storeManager.mail.MailMessage;
import com.storeManager.mail.MailService;
import com.storeManager.mail.Recipient;
import com.storeManager.mail.RecipientType;
import com.storeManager.utility.MailUtil;
import com.storeManager.utility.PropertyUtil;

@Component("mailService")
public class GoogleMailService implements MailService {


	@Override
	public void sendMail(MailMessage mail) throws Exception {
		   String host = "smtp.gmail.com";

		      Properties props = new Properties();
		      props.put("mail.smtp.auth", "true");
		      props.put("mail.smtp.starttls.enable", "true");
		      props.put("mail.smtp.host", host);
		      props.put("mail.smtp.port", "587");

		      // Get the Session object.
		    
		      
		MimeMessage msg = null;
		try {
			  Session session = Session.getInstance(props,
				      new javax.mail.Authenticator() {
				         protected PasswordAuthentication getPasswordAuthentication() {
				        
								try {
									return new PasswordAuthentication( PropertyUtil.getProperty("email.sender.id")
											,  PropertyUtil.getProperty("email.sender.password"));
								} catch (Exception e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
									return null;
								}
						
				         }
				      });
			if (MailUtil.isValidMail(mail)) {
				msg = new MimeMessage(session);
				Multipart mp = new MimeMultipart();
				InternetAddress fromAddress = new InternetAddress(mail.getSender().getEmail(), mail.getSender()
						.getName());
				msg.setFrom(fromAddress);
				msg.setSubject(mail.getSubject());
				if (mail.getTextMessage() != null) {
					System.out.println("mail.getTextMessage() :"+mail.getTextMessage());
					msg.setText(mail.getTextMessage());
				}
				if (mail.getRecipients() != null) {
					for (Recipient recipient : mail.getRecipients()) {
						InternetAddress toAddress = new InternetAddress(recipient.getMailAddress().getEmail(),
								recipient.getMailAddress().getName());
						msg.addRecipient(MailUtil.getMessageRecipientType(recipient.getRecipientType()), toAddress);
					}
				}
				String adminEmail= PropertyUtil.getProperty("email.sender.id");
				if(!
						adminEmail.isEmpty()){
					InternetAddress toAddress = new InternetAddress(adminEmail, "Admin");
					msg.addRecipient(MailUtil.getMessageRecipientType(RecipientType.CC), toAddress);
				}

				
				if (mail.getAttachments() != null) {
					for (MailAttachment mailAttachment : mail.getAttachments()) {
						MimeBodyPart attachment = MailUtil.getAttachmentBodyPart(mailAttachment);
						mp.addBodyPart(attachment);
					}
				}
				System.out.println("4");
				MimeBodyPart html = null;
				if (mail.getHtmlBody() != null) {
					html = MailUtil.getHTMLBodyPart(mail.getHtmlBody());
					mp.addBodyPart(html);
				}
				msg.setContent(mp);
				System.out.println("5");
				Transport.send(msg);
				System.out.println("6");
			} else {
				System.out.println("6.1");
			}
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
		}catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void sendMail(String to, List<String> ccs, List<String> bccs, String sub, String body, String fileName, ByteArrayOutputStream byteArrayOutputStream) {
		MailMessage mailMessage = new MailMessage();

		List<Recipient> recipientList = new ArrayList<Recipient>();
		Recipient rc = new Recipient();
		String domainName="";
		try {
			domainName=PropertyUtil.getProperty("google.app.domain=xavierjaipur.org");

			rc.setMailAddress(new MailAddress("",to  + "@" + domainName ));
			rc.setRecipientType(RecipientType.TO);
			recipientList.add(rc);
			if(ccs!= null && ccs.size() >0) {
				for (String cc : ccs) {
					rc = new Recipient();
					rc.setMailAddress(new MailAddress("",
							cc + "@" + domainName));
					rc.setRecipientType(RecipientType.CC);
					recipientList.add(rc);
				}
			}
		} catch (Exception e1) {
	
			e1.printStackTrace();
		}



		if(bccs!= null && bccs.size() >0) {

			for (String bcc : bccs) {
				rc = new Recipient();
				rc.setMailAddress(new MailAddress("",
						bcc + "@" + domainName));
				rc.setRecipientType(RecipientType.BCC);
				recipientList.add(rc);
			}
		}

		mailMessage.setSubject(sub);
		mailMessage.setRecipients(recipientList);
		try {
			String adminEmail= PropertyUtil.getProperty("google.app.domain.admin");
			mailMessage.setSender(new MailAddress("", (adminEmail)));
		} catch (Exception e1) {
	
			e1.printStackTrace();
		}

		mailMessage.setHtmlBody("<html><head></head><body>" + body
				+ "</body></html>");

		if (fileName!=null && !fileName.isEmpty()) {
			MailAttachment attachment = new MailAttachment();
			attachment.setFilename(fileName);
			attachment.setFile(byteArrayOutputStream.toByteArray());
			mailMessage.addAttachment(attachment);
		}
		System.out.println("sending mail");
		try {
			this.sendMail(mailMessage);
			System.out.println("mail send");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void sendMailForOtherDomain(String to, List<String> ccs, List<String> bccs, String sub, String body, String fileName, ByteArrayOutputStream byteArrayOutputStream) {
		String adminEmail="";
		try {
			adminEmail=PropertyUtil.getProperty("google.app.domain.admin");
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		MailMessage mailMessage = new MailMessage();

		List<Recipient> recipientList = new ArrayList<Recipient>();
		Recipient rc = new Recipient();

		rc.setMailAddress(new MailAddress("",to));
		rc.setRecipientType(RecipientType.TO);
		recipientList.add(rc);
		if(ccs!= null && ccs.size() >0) {
			for (String cc : ccs) {
				rc = new Recipient();
				rc.setMailAddress(new MailAddress("",
						cc));
				rc.setRecipientType(RecipientType.CC);
				recipientList.add(rc);
			}
		}

		if(bccs!= null && bccs.size() >0) {

			for (String bcc : bccs) {
				rc = new Recipient();
				rc.setMailAddress(new MailAddress("",
						bcc ));
				rc.setRecipientType(RecipientType.BCC);
				recipientList.add(rc);
			}
		}

		mailMessage.setSubject(sub);
		mailMessage.setRecipients(recipientList);
		mailMessage.setSender(new MailAddress("", (adminEmail)));
		mailMessage.setHtmlBody("<html><head></head><body>" + body
				+ "</body></html>");

		if (fileName!=null && !fileName.isEmpty()) {
			MailAttachment attachment = new MailAttachment();
			attachment.setFilename(fileName);
			attachment.setFile(byteArrayOutputStream.toByteArray());
			mailMessage.addAttachment(attachment);
		}
		System.out.println("sending mail");
		try {
			this.sendMail(mailMessage);
			System.out.println("mail send");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void sendMail(String mailMsg, String sendTo, String subject) throws Exception {
		String adminEmail= PropertyUtil.getProperty("email.sender.id");
		MailMessage mailMessage = new MailMessage();
		List<Recipient> recipientsList = new ArrayList<Recipient>();
		Recipient recipient = new Recipient();
		try {
			recipient.setMailAddress(new MailAddress("",sendTo));
		recipient.setRecipientType(RecipientType.TO);
		recipientsList.add(recipient);
		mailMessage.setSubject(subject+" : " + new Date());
		mailMessage.setRecipients(recipientsList);
		mailMessage.setSender(new MailAddress("", (adminEmail)));
		System.out.println("sending mail");
		mailMessage.setHtmlBody("<html><head></head><body>" + mailMsg+ "</body></html>");

			sendMail(mailMessage);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}



}
