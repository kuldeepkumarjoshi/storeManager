package com.storeManager.entity;

import java.io.Serializable;
import java.util.Date;


public class Store extends CommanEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	public String toString() {
		return "Stock [id=" + getId() + ", Ticker=" + name + "]";
	}

	private String name;
	
	private Long zoneId;
	
	private String address;
	
	private String contactName;
	
	private String contactNumber1;
	
	private String contactNumber2;
	
	private String contactNumber3;
	
	private String email;
	
	private Date mostRecentOrderDate;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactNumber1() {
		return contactNumber1;
	}

	public void setContactNumber1(String contactNumber1) {
		this.contactNumber1 = contactNumber1;
	}

	public String getContactNumber2() {
		return contactNumber2;
	}

	public void setContactNumber2(String contactNumber2) {
		this.contactNumber2 = contactNumber2;
	}

	public String getContactNumber3() {
		return contactNumber3;
	}

	public void setContactNumber3(String contactNumber3) {
		this.contactNumber3 = contactNumber3;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getMostRecentOrderDate() {
		return mostRecentOrderDate;
	}

	public void setMostRecentOrderDate(Date mostRecentOrderDate) {
		this.mostRecentOrderDate = mostRecentOrderDate;
	}

	public Long getZoneId() {
		return zoneId;
	}

	public void setZoneId(Long zoneId) {
		this.zoneId = zoneId;
	}

}
