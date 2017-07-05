package com.storeManager.dao.hbImpl;


import org.springframework.stereotype.Repository;

import com.storeManager.dao.ProductDAO;
import com.storeManager.entity.Product;


@Repository("productDAO")
public class ProductDAOImpl extends AbstractDAOImpl<Product> implements ProductDAO {

	
}
