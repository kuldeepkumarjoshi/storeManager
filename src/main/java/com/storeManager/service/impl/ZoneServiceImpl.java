package com.storeManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.storeManager.dao.ZoneDAO;
import com.storeManager.entity.Zone;
import com.storeManager.service.ZoneService;

@Component
public class ZoneServiceImpl  extends AbstractServiceImpl<Zone> implements ZoneService {

	
	@Autowired
	@Qualifier("zoneDAOImpl")
	ZoneDAO zoneDAO;	
	
	@Override
	public ZoneDAO getObjectDao() {
	
		return zoneDAO;
	}

	


}
