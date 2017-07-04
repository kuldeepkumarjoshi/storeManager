package com.storeManager.business;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.Store;
import com.storeManager.entity.Zone;
import com.storeManager.service.StoreService;
import com.storeManager.service.ZoneService;
import com.storeManager.utility.GlobalFilterUtility;
import com.storeManager.utility.QueryManager;
import com.storeManager.vo.ZoneDetailVo;

@Component
public class ZoneBusiness {

	@Autowired		
	ZoneService zoneService;
	
	@Autowired
	StoreService storeService;

	public List<Zone> getAllZones() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		
		List<Zone> zoneList = zoneService.getAllByCriteria(creterias, null , Zone.class);
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

	public List<ZoneDetailVo> getAllZonesForZonePage(Date fromDate, Date toDate) throws SQLException {
		List<ZoneDetailVo> zoneDetailVos  = new ArrayList<ZoneDetailVo>();
		String saleDetailQuery = QueryManager.getzoneDetailWithTotalSale();
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("fromDate", fromDate);
		creteriaMap.put("toDate", toDate);
		ArrayList list = (ArrayList) zoneService.executeQuery(saleDetailQuery,creteriaMap);
		for (Object zoneObj : list) { 
			Object[] zoneFields = (Object[]) zoneObj;			
			zoneDetailVos.add(new ZoneDetailVo(zoneFields));
		}
		
		return zoneDetailVos;
		
	}
	
}
