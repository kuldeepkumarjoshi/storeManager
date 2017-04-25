package com.storeManager.entity;

import java.io.Serializable;


public class Zone extends CommanEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	public String toString() {
		return "Zone [id=" + getId() + ", name=" + name + "]";
	}
	
	private String name;
	
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
