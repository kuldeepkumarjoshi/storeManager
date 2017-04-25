package com.storeManager.entity;

import java.io.Serializable;
import java.util.Date;

import com.storeManager.vo.OrderItemVO;


public class OrderItem extends CommanEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public OrderItem(OrderItemVO orderItemVO) {
		title = orderItemVO.getTitle();
		storeId = orderItemVO.getStoreId();
		store = orderItemVO.getStore();
		total = orderItemVO.getTotal();
		subTotal = orderItemVO.getSubTotal();
		status = orderItemVO.	getStatus();
		poNumber = orderItemVO.getPoNumber();
		orderDate = orderItemVO.getOrderDate();
		remarks = orderItemVO.getRemarks();

	}

	public OrderItem() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Zone [id=" + getId() + ", title=" + title + "]";
	}
	
	
	
	private String title;
	
	private Long storeId;
	
	private Store store;
	
	private double total;
	private double subTotal;
	private String status;
	
	private Long poNumber;
	
	private Date orderDate;
	private String remarks;
	
	private Boolean poReceivedOnEmail = Boolean.FALSE;
	
	private Boolean orderReceivedNotification= Boolean.FALSE;
	
	private Boolean orderDeliveredNotification= Boolean.FALSE;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public Long getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(Long poNumber) {
		this.poNumber = poNumber;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Boolean isPoReceivedOnEmail() {
		return poReceivedOnEmail;
	}

	public void setPoReceivedOnEmail(Boolean poReceivedOnEmail) {
		this.poReceivedOnEmail = poReceivedOnEmail;
	}

	public Boolean isOrderReceivedNotification() {
		return orderReceivedNotification;
	}

	public void setOrderReceivedNotification(Boolean orderReceivedNotification) {
		this.orderReceivedNotification = orderReceivedNotification;
	}

	public Boolean isOrderDeliveredNotification() {
		return orderDeliveredNotification;
	}

	public void setOrderDeliveredNotification(Boolean orderDeliveredNotification) {
		this.orderDeliveredNotification = orderDeliveredNotification;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

}
