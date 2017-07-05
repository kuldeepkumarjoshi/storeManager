package com.storeManager.vo;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import com.storeManager.entity.CommanEntity;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.Store;

public class StoreGridVo extends CommanEntity{

	private String name;
	
	private Long zoneId;
	
	private Store store;
	
	Map<Integer,String> weekWiseOrdersSubtotal ;
	
	public StoreGridVo() {
		weekWiseOrdersSubtotal = new HashMap<Integer,String>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Map<Integer,String> getWeekWiseOrdersSubtotal() {
		return weekWiseOrdersSubtotal;
	}

	public void setWeekWiseOrdersSubtotal(Map<Integer,String> weekWiseOrdersSubtotal) {
		this.weekWiseOrdersSubtotal = weekWiseOrdersSubtotal;
	}

	public void setObject(OrderItem orderItem) {
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(orderItem.getDeliveryDate());
		int weekOfMonth = Calendar.WEEK_OF_MONTH;
		String week = weekWiseOrdersSubtotal.get(weekOfMonth);	
		if(week == null){
			weekWiseOrdersSubtotal.put(weekOfMonth,(int)orderItem.getTotal()+ "");
		}else{
			weekWiseOrdersSubtotal.put(weekOfMonth, weekWiseOrdersSubtotal.get(weekOfMonth)+", "+(int)orderItem.getTotal());
		}
		
	}

	public void setCommanEntity(Store store) {
		super.setCommanEntity(store.getId(), store.isActive(), store.isDeleted(), store.getCreatedBy(), store.getCreatedDate(), store.getLastModifiedBy(), store.getLastModifiedDate());
		
	}

	public Long getZoneId() {
		return zoneId;
	}

	public void setZoneId(Long zoneId) {
		this.zoneId = zoneId;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	
}
																																																																																																										