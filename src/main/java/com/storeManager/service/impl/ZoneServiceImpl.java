package com.storeManager.service.impl;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storeManager.dao.ZoneDAO;
import com.storeManager.entity.Zone;
import com.storeManager.service.ZoneService;
import com.storeManager.vo.ZoneDetailVo;

@Service("zoneService")
public class ZoneServiceImpl  extends AbstractServiceImpl<Zone> implements ZoneService {

	
	@Autowired
	ZoneDAO zoneDAO;	
	
	@Override
	public ZoneDAO getObjectDao() {
	
		return zoneDAO;
	}

}
