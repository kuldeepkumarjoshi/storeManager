package com.storeManager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeManager.dao.OrderProductDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;
import com.storeManager.service.OrderProductService;

@Service("orderProductService")
public class OrderProductServiceImpl  extends AbstractServiceImpl<OrderProduct> implements OrderProductService {

	
	@Autowired
	OrderProductDAO orderProductDAO;	
	
	@Override
	public OrderProductDAO getObjectDao() {
	
		return orderProductDAO;
	}

	@Override
	public List<OrderProduct> getAllByOrderItem(OrderItem orderItem) {
		
		return orderProductDAO.getAllByOrderItem(orderItem);
	}

	


}
