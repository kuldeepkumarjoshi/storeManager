package com.storeManager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeManager.dao.OrderItemDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.service.OrderItemService;

@Service("orderItemService")
public class OrderItemServiceImpl  extends AbstractServiceImpl<OrderItem> implements OrderItemService {

	
	@Autowired	
	OrderItemDAO orderItemDAO;	
	
	@Override
	public OrderItemDAO getObjectDao() {	
		return orderItemDAO;
	}

	@Override
	public List<OrderItem> getByOrderStatus(String status, Class<OrderItem> className) {
		
		return orderItemDAO.getByOrderStatus(status,className);
	}

	

}
