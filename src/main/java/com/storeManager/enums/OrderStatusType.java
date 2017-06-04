package com.storeManager.enums;

public enum OrderStatusType {
	IN_PROGRESS("IN_PROGRESS"),COMPLETED("COMPLETED");
	
	private String description;

	public String getOrderStatusType() {
		return description;
	}

	private OrderStatusType(String description) {
		this.description = description;
	}
	
	@Override	
	public String toString(){
		switch(this){
		case IN_PROGRESS: 
			return "inProgress";
		case COMPLETED:
			return "completed";		
		default:
			return null;
		}
	}
}
