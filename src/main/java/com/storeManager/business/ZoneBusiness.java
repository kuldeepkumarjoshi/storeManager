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
import com.storeManager.service.StoreService;
import com.storeManager.service.ZoneService;
import com.storeManager.utility.GlobalFilterUtility;

@Component
public class ZoneBusiness {

	@Autowired		
	ZoneService zoneService;
	
	@Autowired
	StoreService storeService;

	public List<Zone> getAllZones() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		
		List<Zone> zoneList = zoneService.getAllByCriteria(creterias , Zone.class);
		return zoneList;
	}
	
	public void deleleZone(long longID) {
		Zone zone = new Zone();
		zone.setId(longID);
		zone.setDeleted(Boolean.TRUE);
		//storeService.update(store);
		Map<String,Object> setterParams = new HashMap<String, Object>();
		setterParams.put("deleted", Boolean.TRUE);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("id", longID);
		zoneService.updateByCondition(zone, Zone.class, setterParams, creteriaMap);
		Map<String,Object> creteriaMapStore = new HashMap<String, Object>();
		creteriaMap.put("zoneId", longID);
		storeService.updateByCondition(new Store(), Store.class, setterParams, creteriaMapStore);
	
	}
	
}
