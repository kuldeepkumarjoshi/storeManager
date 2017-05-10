package com.storeManager.entity;

import java.io.Serializable;
import java.util.Date;

import com.storeManager.enums.OrderStatusType;
import com.storeManager.vo.OrderItemVO;


public class OrderItem extends CommanEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public OrderItem(OrderItemVO orderItemVO) {
		title = orderItemVO.getTitle()+"_"+new Date();
		storeId = orderItemVO.getStoreId();
		store = orderItemVO.getStore();
		if(orderItemVO.getOrderProducts()!=null){
			for(OrderProduct orderProduct : orderItemVO.getOrderProducts()){
				subTotal =  subTotal + orderProduct.getPrice()*orderProduct.getQuantity();
			}
		}
		total = subTotal;
		status = orderItemVO.	getStatus();
		poNumber = orderItemVO.getPoNumber();
		deliveryDate = orderItemVO.getDeliveryDate();
		remarks = orderItemVO.getRemarks();

	}

	public OrderItem() {
		// TODO Auto-generated constructor stub
	}

	
	
	
	
	private String title;
	
	private Long storeId;
	
	private Store store;
	
	private double total = 0.0;
	private double subTotal =0.0 ;
	private String status = OrderStatusType.IN_PROGRESS.toString();
	
	private Long poNumber;
	
	private Date deliveryDate;
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

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	@Override
	public String toString() {
		return "OrderItem [title=" + title + ", storeId=" + storeId
				+ ", store=" + store + ", total=" + total + ", subTotal="
				+ subTotal + ", status=" + status + ", poNumber=" + poNumber
				+ ", deliveryDate=" + deliveryDate + ", remarks=" + remarks
				+ ", poReceivedOnEmail=" + poReceivedOnEmail
				+ ", orderReceivedNotification=" + orderReceivedNotification
				+ ", orderDeliveredNotification=" + orderDeliveredNotification
				+ "]";
	}

}
