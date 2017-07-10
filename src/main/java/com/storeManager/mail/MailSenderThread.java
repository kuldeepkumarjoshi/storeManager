package com.storeManager.mail;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.storeManager.business.OrderBusiness;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;
import com.storeManager.utility.MailUtil;
import com.storeManager.utility.PropertyUtil;
import com.storeManager.utility.ServerCommonConstant;
import com.storeManager.vo.OrderItemVO;

@Component
@Scope("prototype")
public class MailSenderThread implements Runnable{
	
	private OrderItem orderItem = null;
	private MimeMessage mailMessage =null;
	
	@Autowired
	OrderBusiness orderBusiness;	

	@Autowired
	MailService mailService;

	public void setOrderItem(OrderItem orderItem) {
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
			System.out.println("sending mail ...");				
			Transport.send(mailMessage);
			System.out.println("mail send successfully");
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
			InternetAddress fromAddress = new InternetAddress(MailUtil.EMIAL_SENDER,MailUtil.EMIAL_SENDER);
			mailMessage.setFrom(fromAddress);
		}else{
			 throw new AddressException("sender invalid ");
		}
		
		String subject ="New Order-";
		
		
		String txtMessage = "<html><head></head><body> <br/> Store Name: ";
		if(orderItem.getTitle()!=null){
			String[] titleStr =orderItem.getTitle().split("-");
			subject+=orderItem.getTitle();
			txtMessage+=titleStr[0]+"<br/> Zone Name: "+titleStr[1]+"<br/> Delivery Date:"+titleStr[2];
		}
		mailMessage.setSubject(subject);
		if(orderItem.getRemarks()!=null){
			txtMessage+="<br/> Remark: "+orderItem.getRemarks();
		}
		String borderStyle="style='border: 1px solid black;'";
		String alingAndBorder = "style='text-align: right;border: 1px solid black;'";
		txtMessage+="<br/>Details: <br/><table "+borderStyle+"><thead><tr><th "+borderStyle+">Product</th><th "+borderStyle+">Unit price</th><th "+borderStyle+">Quantity</th></tr></thead><tbody>";
		
		
		OrderItemVO orderItemVo  =  orderBusiness.getOrderItemVO(orderItem.getId()+"");
		for (OrderProduct orderProduct : orderItemVo.getOrderProducts()) {
			txtMessage+="<tr><td "+borderStyle+">"+orderProduct.getName()+"</td><td "+alingAndBorder+">"+orderProduct.getPrice()+
					"</td><td "+alingAndBorder+">"+orderProduct.getQuantity()+"</td></tr>";
		}
		
		txtMessage+="<tr><th "+borderStyle+"></th><th "+borderStyle+">Total </th><th "+alingAndBorder+">"+orderItem.getTotal()+"</th></tr></tbody></table>";
		txtMessage+= "</body></html>";		
		mailMessage.setContent(txtMessage, "text/html; charset=utf-8");
		System.out.println("html :"+txtMessage);
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

	public void sendOrderMail(OrderItem orderItem) {
		this.setOrderItem(orderItem);
		Thread mailSendingThread = new Thread(this);	
		mailSendingThread.start();
		
	}

	
}
