package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.storeManager.dao.ProductDAO;
import com.storeManager.entity.Product;
import com.storeManager.service.ProductService;

@Component
public class ProductServiceImpl  extends AbstractServiceImpl<Product> implements ProductService {

	
	@Autowired
	@Qualifier("productDAOImpl")
	ProductDAO productDAO;	
	
	@Override
	public ProductDAO getObjectDao() {
	
		return productDAO;
	}

	


}
