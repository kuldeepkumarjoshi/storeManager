package com.storeManager.mail;


public interface MailService {

	public void sendMail(MailMessage message) throws Exception;
	public void  sendMail(String mailMsg, String sendTo, String methodName) throws Exception;
}
