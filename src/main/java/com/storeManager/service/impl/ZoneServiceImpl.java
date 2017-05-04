package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeManager.dao.ZoneDAO;
import com.storeManager.entity.Zone;
import com.storeManager.service.ZoneService;

@Service("zoneService")
public class ZoneServiceImpl  extends AbstractServiceImpl<Zone> implements ZoneService {

	
	@Autowired
	ZoneDAO zoneDAO;	
	
	@Override
	public ZoneDAO getObjectDao() {
	
		return zoneDAO;
	}

	


}
