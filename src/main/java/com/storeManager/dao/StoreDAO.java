package com.storeManager.dao;

import java.util.List;

import com.storeManager.entity.Store;

 
public interface StoreDAO extends CommanDAO<Store>{

	List<Store> getAllByZoneId(long parseLong, String databaseString);

}
