package com.storeManager.utility;

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

import com.storeManager.entity.OrderItem;
import com.storeManager.mail.MailAttachment;
import com.storeManager.mail.MailMessage;
import com.storeManager.mail.MailSenderThread;

public class MailUtil {	
	
	private static MimetypesFileTypeMap mediaTypes;
	
	static{
		
	}
	public static final String EMIAL_SENDER = PropertyUtil.getProperty(ServerCommonConstant.EMAIL_SENDER_ID);
	public static final String SENDER_PASSWORD = PropertyUtil.getProperty(ServerCommonConstant.EMAIL_SENDER_PASSWORD);

	public static final String MAIL_SMTP_HOST = PropertyUtil.getProperty(ServerCommonConstant.MAIL_SMTP_HOST);    
	public static final String MAIL_SMTP_SOCKETFACTORY_PORT = PropertyUtil.getProperty(ServerCommonConstant.MAIL_SMTP_SOCKETFACTORY_PORT);    
	public static final String MAIL_SMTP_SOCKETFACTORY_CLASS = PropertyUtil.getProperty(ServerCommonConstant.MAIL_SMTP_SOCKETFACTORY_CLASS);      
	public static final String MAIL_SMTP_AUTH = PropertyUtil.getProperty(ServerCommonConstant.MAIL_SMTP_AUTH);     
	public static final String MAIL_SMTP_PORT =  PropertyUtil.getProperty(ServerCommonConstant.MAIL_SMTP_PORT);    


	public static Message.RecipientType getMessageRecipientType(String type) {
		Message.RecipientType recipientType = null;
		switch (type) {
		case "TO":
			recipientType = MimeMessage.RecipientType.TO;
			break;
		case "CC":
			recipientType = MimeMessage.RecipientType.CC;
			break;
		case "BCC":
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

	public static void sendOrderMail(OrderItem orderItem) {
		String APP_SEND_EMAIL = PropertyUtil.getProperty(ServerCommonConstant.APP_SEND_EMAIL);
		
		if(APP_SEND_EMAIL.equalsIgnoreCase("yes")){
			String APP_SEND_SPECIFIC_EMAIL = PropertyUtil.getProperty(ServerCommonConstant.APP_SEND_SPECIFIC_EMAIL+orderItem.getStatus());
			if(APP_SEND_SPECIFIC_EMAIL.equalsIgnoreCase("yes")){
			MailSenderThread mailSenderThread = new MailSenderThread(orderItem);	
			Thread mailSendingThread = new Thread(mailSenderThread);	
			mailSendingThread.start();
			}
		}
	}
	
	
}
