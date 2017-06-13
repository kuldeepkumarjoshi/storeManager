package com.storeManager.business;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;
import com.storeManager.entity.Store;
import com.storeManager.entity.Zone;
import com.storeManager.enums.OrderStatusType;
import com.storeManager.service.OrderItemService;
import com.storeManager.service.OrderProductService;
import com.storeManager.service.StoreService;
import com.storeManager.service.ZoneService;
import com.storeManager.utility.GlobalFilterUtility;

@Component
public class OrderBusiness {

	@Autowired		
	ZoneService zoneService;
	
	@Autowired 
	StoreService 	storeService; 
	
	@Autowired		
	OrderItemService orderItemService;
	
	@Autowired		
	OrderProductService orderProductService;

	public List<Zone> getAllZones() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();
		
		List<Zone> zoneList = zoneService.getAllByCriteria(creterias , Zone.class);
		return zoneList;
		
	}

	public List<String> getOrderStatus() {
		List<String> ostList = new ArrayList<String>();
		for(OrderStatusType ost : OrderStatusType.values()){
			ostList.add(ost.getOrderStatusType());
		}
		return ostList;
	}

	public List<OrderProduct> getOrderProductsByOrderId(String orderIdStr) {
		Long orderId = Long.parseLong(orderIdStr);
		OrderItem orderItem = new OrderItem();
		orderItem.setId(orderId);
		List<OrderProduct> orderProducts = orderProductService.getAllByOrderItem(orderItem);
		return orderProducts;
	}

	public OrderItem getOrderItemById(String orderId) {
		OrderItem order  = orderItemService.getById(Long.parseLong(orderId),OrderItem.class);
		return order;
	}

	public List<OrderItem> getAllByStore(Store store) {
		SimpleExpression spe = Restrictions.eq("store", store);
		return orderItemService.getAllByFKoreignKey(spe, OrderItem.class);		 
	}

	public Long insert(OrderItem orderItem) {
		Store store = orderItem.getStore();
		Long orderId = orderItemService.insert(orderItem);
		Map<String,Object> setterParams = new HashMap<>();
		SimpleDateFormat newFormat = new SimpleDateFormat("yyyy-MM-dd");
		String finalString = newFormat.format(orderItem.getCreatedDate());
		setterParams.put("mostRecentOrderDate", finalString);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("id", store.getId());
		if(orderId !=null){
			storeService.updateByCondition(store,Store.class,setterParams,creteriaMap);	
		}
		
		return orderId;
		
	}

	public void deleleOrder(long longID) {
		OrderItem odItem = new OrderItem();
		odItem.setId(longID);
		odItem.setDeleted(Boolean.TRUE);
		Map<String,Object> setterParams = new HashMap<String, Object>();
		setterParams.put("deleted", Boolean.TRUE);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("id", longID);
		orderItemService.updateByCondition(odItem, OrderItem.class, setterParams, creteriaMap);
		deleleAllOrderProductByOrderId(longID);
	}

	public void deleleOrderProduct(long longID) {
		OrderProduct odProItem = new OrderProduct();
		odProItem.setId(longID);
		odProItem.setDeleted(Boolean.TRUE);
		Map<String,Object> setterParams = new HashMap<String, Object>();
		setterParams.put("deleted", Boolean.TRUE);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("id", longID);
		orderProductService.updateByCondition(odProItem, OrderProduct.class, setterParams, creteriaMap);
	}
	
	public void deleleAllOrderProductByOrderId(long orderlongID) {
		OrderProduct odProItem = new OrderProduct();
		odProItem.setId(orderlongID);
		odProItem.setDeleted(Boolean.TRUE);
		Map<String,Object> setterParams = new HashMap<String, Object>();
		setterParams.put("deleted", Boolean.TRUE);
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		creteriaMap.put("orderId", orderlongID);
		orderProductService.updateByCondition(odProItem, OrderProduct.class, setterParams, creteriaMap);
	}

	public List<OrderItem> getAllOrders() {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		
		// List<Store> storeList = storeService.getAll("from Store");
		List<OrderItem> orderItems = orderItemService.getAllByCriteria(creterias , OrderItem.class);
		return orderItems;
	}
	
	

	
	
}
