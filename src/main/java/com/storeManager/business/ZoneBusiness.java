package com.storeManager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.Store;
import com.storeManager.entity.Zone;
import com.storeManager.service.StoreService;
import com.storeManager.service.ZoneService;

@Component
public class ZoneBusiness {

	@Autowired		
	ZoneService zoneService;

	public List<Zone> getAllZones() {
		List<Zone> zoneList = zoneService.getAll("from Zone");
		return zoneList;
	}
	
	
}
