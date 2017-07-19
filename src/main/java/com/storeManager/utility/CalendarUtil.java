package com.storeManager.utility;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Properties;
import java.util.TimeZone;

public class CalendarUtil {

	public static String convertUTCtoIST(Date utcDate,String formateString){

		DateFormat formatter = new SimpleDateFormat(formateString);
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata")); // Or whatever IST is supposed to be
		return formatter.format(utcDate);
	}

	public static Map<String, Date> getMonthLimit(Map<String, Date> monthLimits, String month) {
		Calendar cal =  Calendar.getInstance();
		int selectMonth = 0;
		if(month == null || month.equals("-1") ){							
			selectMonth = cal.get(Calendar.MONTH);
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
