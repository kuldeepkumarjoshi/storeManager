package com.storeManager.vo;

import java.util.Date;
import java.util.List;

import com.storeManager.entity.CommanEntity;
import com.storeManager.entity.OrderProduct;
import com.storeManager.entity.Store;


public class OrderItemVO extends CommanEntity {
	
	private String title;
	
	private Long storeId;
	
	private Store store;
	
	private List<OrderProduct> orderProducts;
	
	private double total;
	private double subTotal;
	private String status;
	
	private Long poNumber;
	
	private Date deliveryDate;
	private String remarks;
	
	private boolean poReceivedOnEmail = Boolean.FALSE;
	
	private boolean orderReceivedNotification= Boolean.FALSE;
	
	private boolean orderDeliveredNotification= Boolean.FALSE;
	
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

	

	public boolean isPoReceivedOnEmail() {
		return poReceivedOnEmail;
	}

	public void setPoReceivedOnEmail(boolean poReceivedOnEmail) {
		this.poReceivedOnEmail = poReceivedOnEmail;
	}

	public boolean isOrderReceivedNotification() {
		return orderReceivedNotification;
	}

	public void setOrderReceivedNotification(boolean orderReceivedNotification) {
		this.orderReceivedNotification = orderReceivedNotification;
	}

	public boolean isOrderDeliveredNotification() {
		return orderDeliveredNotification;
	}

	public void setOrderDeliveredNotification(boolean orderDeliveredNotification) {
		this.orderDeliveredNotification = orderDeliveredNotification;
	}

	public List<OrderProduct> getOrderProducts() {
		return orderProducts;
	}

	public void setOrderProducts(List<OrderProduct> orderProducts) {
		this.orderProducts = orderProducts;
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

}
