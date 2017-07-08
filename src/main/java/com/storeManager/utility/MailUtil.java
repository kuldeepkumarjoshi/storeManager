package com.storeManager.utility;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.MimetypesFileTypeMap;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.storeManager.mail.MailAddress;
import com.storeManager.mail.MailAttachment;
import com.storeManager.mail.MailMessage;
import com.storeManager.mail.MailService;
import com.storeManager.mail.Recipient;
import com.storeManager.mail.RecipientType;
import com.storeManager.mail.impl.GoogleMailService;

public class MailUtil {

	@Autowired
	@Qualifier("mailService")
	private static	MailService mailService;
	
	private static MimetypesFileTypeMap mediaTypes;
	
	public static final String EMIAL_SENDER = PropertyUtil.getProperty(ServerCommonConstant.EMAIL_SENDER_ID);
	public static final String SENDER_PASSWORD = PropertyUtil.getProperty(ServerCommonConstant.EMAIL_SENDER_PASSWORD);


	public static Message.RecipientType getMessageRecipientType(RecipientType type) {
		Message.RecipientType recipientType = null;
		switch (type) {
		case TO:
			recipientType = MimeMessage.RecipientType.TO;
			break;
		case CC:
			recipientType = MimeMessage.RecipientType.CC;
			break;
		case BCC:
			recipientType = MimeMessage.RecipientType.BCC;
			break;
		}
		return recipientType;
	}
	
	private static void registerMediaTypes() {
		// Common MIME types used for uploading attachments.
		mediaTypes = new MimetypesFileTypeMap();
		mediaTypes.addMimeTypes("application/msword doc");
		mediaTypes.addMimeTypes("application/vnd.ms-excel xls");
		mediaTypes.addMimeTypes("application/pdf pdf");
		mediaTypes.addMimeTypes("text/richtext rtx");
		mediaTypes.addMimeTypes("text/csv csv");
		mediaTypes.addMimeTypes("text/tab-separated-values tsv tab");
		mediaTypes
				.addMimeTypes("application/x-vnd.oasis.opendocument.spreadsheet ods");
		mediaTypes.addMimeTypes("application/vnd.oasis.opendocument.text odt");
		mediaTypes.addMimeTypes("application/vnd.ms-powerpoint ppt pps pot");
		mediaTypes
				.addMimeTypes("application/vnd.openxmlformats-officedocument."
						+ "wordprocessingml.document docx");
		mediaTypes
				.addMimeTypes("application/vnd.openxmlformats-officedocument."
						+ "spreadsheetml.sheet xlsx");
		mediaTypes.addMimeTypes("audio/mpeg mp3 mpeg3");
		mediaTypes.addMimeTypes("image/png png");
		mediaTypes.addMimeTypes("application/zip zip");
		mediaTypes.addMimeTypes("application/x-tar tar");
		mediaTypes.addMimeTypes("video/quicktime qt mov moov");
		mediaTypes.addMimeTypes("video/mpeg mpeg mpg mpe mpv vbs mpegv");
		mediaTypes.addMimeTypes("video/msvideo avi");
	}
	public static MimeBodyPart getAttachmentBodyPart(MailAttachment mailAttachment) throws Exception {
		MimeBodyPart attachment = new MimeBodyPart();
		try {
			attachment.setFileName(mailAttachment.getFilename());
			registerMediaTypes();
			System.out.println("Mime type"+mediaTypes.getContentType(mailAttachment.getFilename()));
			byte[] data = mailAttachment.getFile();
			/*for(int i=0;i<mailAttachment.getFile().length;i++)	{
				data[i]=mailAttachment.getFile()[i].byteValue();
			}*/
		    DataSource src = new ByteArrayDataSource(data, mediaTypes.getContentType(mailAttachment.getFilename())); 
			attachment.setContent(mailAttachment.getFile(), mediaTypes.getContentType(mailAttachment.getFilename()));
			attachment.setDataHandler(new DataHandler(src));
		} catch (MessagingException messagingException) {
			String message = "Unable to access Mail Attachment ";
			
			throw new Exception("MessagingException: " + message, messagingException);
		}
		return attachment;
	}

	public static MimeBodyPart getHTMLBodyPart(String htmlBody) throws Exception {
		MimeBodyPart attachment = new MimeBodyPart();
		try {
			attachment.setContent(htmlBody, "text/html");
		} catch (MessagingException messagingException) {
			String message = "Unable to access HTML contet in mail ";
			
			throw new Exception("MessagingException: " + message, messagingException);
		}
		return attachment;
	}

	public static boolean isValidMail(MailMessage mailMessage) {
		boolean isValid = false;
		if (mailMessage.getRecipients().size() != 0 && mailMessage.getSender() != null) {
			if (mailMessage.getHtmlBody() != null || mailMessage.getTextMessage() != null) {
				isValid = true;
			}
		}
		return isValid;
	}

	public static String getQualifiedName(String templateName) {
		return "mailTemplate/" + templateName;
	}
	
	public static boolean isValidEmailAddress(String email) {
	   boolean result = true;
	   try {
	      InternetAddress emailAddr = new InternetAddress(email);
	      emailAddr.validate();
	   } catch (AddressException ex) {
	      result = false;
	   }
	   return result;
	}
	
	public static void sendMail(String mailMsg, String sendTo, String subject) throws Exception {

			MailMessage mailMessage = new MailMessage();
			List<Recipient> recipientsList = new ArrayList<Recipient>();
			Recipient recipient = new Recipient();
			try {
				recipient.setMailAddress(new MailAddress("",sendTo));
			recipient.setRecipientType(RecipientType.TO);
			recipientsList.add(recipient);
			mailMessage.setSubject(subject+" : " + new Date());
			mailMessage.setRecipients(recipientsList);
			mailMessage.setSender(new MailAddress("", (EMIAL_SENDER)));
			System.out.println("sending mail");
			mailMessage.setHtmlBody("<html><head></head><body>" + mailMsg+ "</body></html>");
			mailService = new GoogleMailService();	
			mailService.setMailMessage(mailMessage);
			Thread mailSendingThread = new Thread(mailService);				
			mailSendingThread.start();
			} catch (Exception e) {
				e.printStackTrace();
			}

		
	}
	
	
}
