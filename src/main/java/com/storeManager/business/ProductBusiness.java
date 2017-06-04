package com.storeManager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.Product;
import com.storeManager.service.ProductService;

@Component
public class ProductBusiness {

	@Autowired		
	ProductService productService;

	public List<Product> getAllProductList() {
		List<Product> productList = productService.getAll("from Product");
		return productList;
	}
	
	
}
