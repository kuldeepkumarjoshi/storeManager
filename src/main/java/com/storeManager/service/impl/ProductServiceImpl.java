package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeManager.dao.ProductDAO;
import com.storeManager.entity.Product;
import com.storeManager.service.ProductService;

@Service("productService")
public class ProductServiceImpl  extends AbstractServiceImpl<Product> implements ProductService {

	
	@Autowired
	ProductDAO productDAO;	
	
	@Override
	public ProductDAO getObjectDao() {
	
		return productDAO;
	}

	


}
