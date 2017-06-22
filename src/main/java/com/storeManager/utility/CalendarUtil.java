package com.storeManager.utility;

import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

public class CalendarUtil {

	public static String getProperty(String key) throws Exception {
		InputStream ipathshalaPropertiesLoadStream = CalendarUtil.class.getClassLoader().getResourceAsStream("store.properties");
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

	public static Map<String, Date> getMonthLimit(Map<String, Date> monthLimits, String month) {
		Calendar cal =  Calendar.getInstance();
		int selectMonth = 0;
		if(month == null || month.equals("-1") ){							
			selectMonth = Calendar.DAY_OF_MONTH;
		}else{
			selectMonth = Integer.parseInt(month);							
		}
		cal.set(cal.get(Calendar.YEAR),selectMonth,1);
		monthLimits.put("fromDate", cal.getTime());
		cal.set(cal.get(Calendar.YEAR),selectMonth,cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		monthLimits.put("toDate", cal.getTime());		
		return monthLimits;
	}
	

}
