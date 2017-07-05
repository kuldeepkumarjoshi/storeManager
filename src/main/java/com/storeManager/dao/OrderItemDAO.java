package com.storeManager.dao;

import java.util.List;

import com.storeManager.entity.OrderItem;

 
public interface OrderItemDAO extends CommanDAO<OrderItem>{

	List<OrderItem> getByOrderStatus(String status, Class<OrderItem> className);

}
