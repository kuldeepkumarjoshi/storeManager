package com.storeManager.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.Store;
import com.storeManager.service.StoreService;
import com.storeManager.utility.GlobalFilterUtility;

@Component
public class StoreBusiness {

	@Autowired		
	StoreService storeService;

	public List<Store> getAllStores() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		
		// List<Store> storeList = storeService.getAll("from Store");
		List<Store> storeList = storeService.getAllByCriteria(creterias , Store.class);
		return storeList;
	}

	public void deleleStore(long longID) {
		Store store = new Store();
		store.setId(longID);
		store.setDeleted(Boolean.TRUE);
		//storeService.update(store);
		Map<String,Object> setterParams = new HashMap<String, Object>();
		setterParams.put("deleted", Boolean.TRUE);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("id", longID);
		storeService.updateByCondition(store, Store.class, setterParams, creteriaMap);
		
	}
	
	
}
