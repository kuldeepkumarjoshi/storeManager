package com.storeManager.service;

import java.util.List;

import com.storeManager.entity.Store;


public interface StoreService extends CommanService<Store> {

	List<Store> getAllByZoneId(long parseLong, String string);

	
}
