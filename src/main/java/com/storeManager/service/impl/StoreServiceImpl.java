package com.storeManager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeManager.dao.StoreDAO;
import com.storeManager.entity.Store;
import com.storeManager.service.StoreService;

@Service("storeService")
public class StoreServiceImpl  extends AbstractServiceImpl<Store> implements StoreService {

	
	@Autowired
	StoreDAO storeDAO;	
	
	@Override
	public StoreDAO getObjectDao() {
	
		return storeDAO;
	}

	@Override
	public List<Store> getAllByZoneId(long parseLong, String databaseString) {		
		return storeDAO.getAllByZoneId(parseLong,databaseString);
	}

	


}
