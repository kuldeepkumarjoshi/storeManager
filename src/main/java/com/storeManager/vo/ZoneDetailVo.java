package com.storeManager.vo;

import com.storeManager.entity.CommanEntity;

public class ZoneDetailVo extends CommanEntity{

	private String name;
	
	private int TotalStores;
	
	private double totalSales;
	
	public ZoneDetailVo(Object[] zoneFields) {
		this.setId(zoneFields[0] == null ?this.getId() : Long.parseLong(zoneFields[0]+""));
		this.setName(zoneFields[1] == null ?this.getName() :zoneFields[1].toString());
		this.setTotalStores(zoneFields[2] == null ?this.getTotalStores() :Integer.parseInt(zoneFields[2]+"") );
		this.setTotalSales(zoneFields[3] == null ?this.getTotalSales() :Double.parseDouble(zoneFields[3]+""));
	}
	
	public ZoneDetailVo() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTotalStores() {
		return TotalStores;
	}

	public void setTotalStores(int totalStores) {
		TotalStores = totalStores;
	}

	public double getTotalSales() {
		return totalSales;
	}

	public void setTotalSales(double totalSales) {
		this.totalSales = totalSales;
	}
}
