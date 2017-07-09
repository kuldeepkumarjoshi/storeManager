package com.storeManager.mail;

import java.util.Properties;

import javax.mail.Session;


public interface MailService{

	public Properties getProperties();

	public Session getSessionForMail(Properties props);


}
