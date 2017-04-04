package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.storeManager.dao.StoreDAO;
import com.storeManager.entity.Store;
import com.storeManager.service.StoreService;

@Component
public class StoreServiceImpl  extends AbstractServiceImpl<Store> implements StoreService {

	
	@Autowired
	@Qualifier("storeDAOImpl")
	StoreDAO storeDAO;	
	
	@Override
	public StoreDAO getObjectDao() {
	
		return storeDAO;
	}

	


}
