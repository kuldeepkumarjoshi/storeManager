package com.storeManager.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.Product;
import com.storeManager.entity.Store;
import com.storeManager.entity.Zone;
import com.storeManager.service.ProductService;
import com.storeManager.utility.GlobalFilterUtility;

@Component
public class ProductBusiness {

	@Autowired		
	ProductService productService;

	public List<Product> getAllProductList() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();
		
		List<Product> productList = productService.getAllByCriteria(creterias,null , Product.class);
		return productList;
	}
	
	public void deleleProduct(long longID) {
		Product product = new Product();
		product.setId(longID);
		product.setDeleted(Boolean.TRUE);
		//storeService.update(store);
		Map<String,Object> setterParams = new HashMap<String, Object>();
		setterParams.put("deleted", Boolean.TRUE);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("id", longID);
		productService.updateByCondition(product, Product.class, setterParams, creteriaMap);
		
	}
	
}
