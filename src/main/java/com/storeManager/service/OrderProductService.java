package com.storeManager.service;

import java.util.List;

import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;


public interface OrderProductService extends CommanService<OrderProduct> {

	List<OrderProduct> getAllByOrderItem(OrderItem orderItem);

	
}
