package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.storeManager.dao.OrderItemDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.service.OrderItemService;

@Component
public class OrderItemServiceImpl  extends AbstractServiceImpl<OrderItem> implements OrderItemService {

	
	@Autowired
	@Qualifier("orderItemDAOImpl")
	OrderItemDAO orderItemDAO;	
	
	@Override
	public OrderItemDAO getObjectDao() {
	
		return orderItemDAO;
	}

	


}
