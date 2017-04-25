package com.storeManager.entity;

import java.io.Serializable;

public class OrderProduct extends CommanEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long orderId;
	private Long productId;
	
	private double price =0.0 ;
	
	private int quantity=0 ;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "orderProduct [orderId=" + orderId + ", productId=" + productId
				+ ", price=" + price + ", quantity=" + quantity + "]";
	}
	
}
