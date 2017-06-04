package com.storeManager.dao;

import java.util.List;

import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;

 
public interface OrderProductDAO extends CommanDAO<OrderProduct>{

	List<OrderProduct> getAllByOrderItem(OrderItem orderItem);

}
