package com.storeManager.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.OrderItem;
import com.storeManager.entity.Store;
import com.storeManager.service.OrderItemService;
import com.storeManager.service.StoreService;
import com.storeManager.service.ZoneService;
import com.storeManager.utility.GlobalFilterUtility;
import com.storeManager.vo.StoreGridVo;

@Component
public class StoreBusiness {

	@Autowired		
	StoreService storeService;
	
	@Autowired
	ZoneService zoneService;
	
	@Autowired
	OrderItemService orderItemService;

	public List<Store> getAllStores() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		
		// List<Store> storeList = storeService.getAll("from Store");
		List<Store> storeList = storeService.getAllByCriteria(creterias,null , Store.class);
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

	public List<StoreGridVo> getGridDataForStorePage(Long zoneId, Date fromDate, Date toDate) {
		List<StoreGridVo> storeGridVos = new ArrayList<StoreGridVo>();
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();	
		Map<Long,StoreGridVo> orderItemStoreMap = new HashMap<Long,StoreGridVo>(); 
		if(zoneId != null){			
			creterias.add(Restrictions.eq("zoneId",zoneId));
		}		
		Projection projection =null;// Projections.property("id");
		List<Store> storeList = storeService.getAllByCriteria(creterias,projection, Store.class);
		if(storeList.size() > 0){
			for (Store store : storeList) {			
				StoreGridVo storeGridVo = orderItemStoreMap.get(store.getId());
				if(storeGridVo == null){	
					storeGridVo = new StoreGridVo();
					storeGridVo.setCommanEntity(store);
					storeGridVo.setStore(store);				
					orderItemStoreMap.put(store.getId(), storeGridVo);
					storeGridVos.add(storeGridVo);				
				}			
			}
			List<Criterion> orderCriterias = GlobalFilterUtility.getGlobalFilterCreteria();
			orderCriterias.add(Restrictions.in("store",storeList));		
			LogicalExpression andExp  = Restrictions.and(Restrictions.ge("createdDate",fromDate), Restrictions.le("createdDate",toDate));
			orderCriterias.add(andExp);
			List<OrderItem> orderItemList = orderItemService.getAllByCriteria(orderCriterias, null, OrderItem.class);
			for (OrderItem orderItem : orderItemList) {			
				StoreGridVo storeGridVo = orderItemStoreMap.get(orderItem.getStore().getId());
				if(storeGridVo == null){	
					storeGridVo = new StoreGridVo();
					storeGridVo.setCommanEntity(orderItem.getStore());
					storeGridVo.setStore(orderItem.getStore());				
					orderItemStoreMap.put(orderItem.getStore().getId(), storeGridVo);
					storeGridVos.add(storeGridVo);				
				}
				storeGridVo.setObject(orderItem);			
			}
		}
		return storeGridVos;
	}

	public List<Store> getAllByZoneId(Long zoneId) {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();
		if(zoneId != null){			
			creterias.add(Restrictions.eq("zoneId",zoneId));
		}
		return 	 storeService.getAllByCriteria(creterias,null, Store.class);
	}
	
	
}
