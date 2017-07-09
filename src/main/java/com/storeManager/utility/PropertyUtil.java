package com.storeManager.utility;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyUtil {
	
	private static InputStream ipathshalaPropertiesLoadStream = null;
	private static Properties ipathshalaProperties =null; 
	static{
		 ipathshalaPropertiesLoadStream = PropertyUtil.class.getClassLoader().getResourceAsStream("store.properties");
		try{
		 if (ipathshalaPropertiesLoadStream == null) {
			 	throw new Exception("Cannod read from store properties file");
			}
		  ipathshalaProperties = new Properties();
			try {
				ipathshalaProperties.load(ipathshalaPropertiesLoadStream);
			} catch (IOException e) {
				throw new Exception("Cannod read from store properties file");
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}

	public static String getProperty(String key){
		String propertyValue = ipathshalaProperties.getProperty(key);
		if(propertyValue == null ){
			try {
				throw new Exception(key + "not have value in store properties.");
			} catch (Exception e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
		}
		return propertyValue;
	}
	

}
