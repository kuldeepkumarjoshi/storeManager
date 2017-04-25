package com.storeManager.utility;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyUtil {

	public static String getProperty(String key) throws Exception {
		InputStream ipathshalaPropertiesLoadStream = PropertyUtil.class.getClassLoader().getResourceAsStream("store.properties");
		if (ipathshalaPropertiesLoadStream == null) {
			throw new Exception("Cannod read from Ipathshala properties file");
		}
		Properties ipathshalaProperties = new Properties();
		try {
			ipathshalaProperties.load(ipathshalaPropertiesLoadStream);
		} catch (IOException e) {
			throw new Exception("Cannod read from Ipathshala properties file");
		}
		String propertyValue = ipathshalaProperties.getProperty(key);
		return propertyValue;
	}
	

}
