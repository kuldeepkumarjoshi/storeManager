package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.storeManager.dao.OrderProductDAO;
import com.storeManager.entity.OrderProduct;
import com.storeManager.service.OrderProductService;

@Component
public class OrderProductServiceImpl  extends AbstractServiceImpl<OrderProduct> implements OrderProductService {

	
	@Autowired
	@Qualifier("orderProductDAOImpl")
	OrderProductDAO orderProductDAO;	
	
	@Override
	public OrderProductDAO getObjectDao() {
	
		return orderProductDAO;
	}

	


}
