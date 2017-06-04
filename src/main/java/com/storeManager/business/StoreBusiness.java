package com.storeManager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.Store;
import com.storeManager.service.StoreService;

@Component
public class StoreBusiness {

	@Autowired		
	StoreService storeService;

	public List<Store> getAllStores() {
		List<Store> storeList = storeService.getAll("from Store");
		return storeList;
	}
	
	
}
