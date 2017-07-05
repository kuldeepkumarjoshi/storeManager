package com.storeManager.service;

import java.util.List;

import com.storeManager.entity.OrderItem;


public interface OrderItemService extends CommanService<OrderItem> {

	List<OrderItem> getByOrderStatus(String status, Class<OrderItem> className);

	
	
}
