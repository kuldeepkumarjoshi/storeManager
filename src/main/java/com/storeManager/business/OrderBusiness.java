package com.storeManager.business;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
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
import com.storeManager.utility.CalendarUtil;
import com.storeManager.utility.GlobalFilterUtility;
import com.storeManager.utility.QueryManager;
import com.storeManager.vo.OrderItemVO;

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
		
		List<Zone> zoneList = zoneService.getAllByCriteria(creterias,null , Zone.class);
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
		List<OrderItem> orderItems = orderItemService.getAllByCriteria(creterias ,null, OrderItem.class);
		return orderItems;
	}

	public List<OrderItem> getOrderByStatus(String status) {		
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		creterias.add(Restrictions.eq("status", status));
		List<OrderItem> orderItems = orderItemService.getAllByCriteria(creterias ,null, OrderItem.class);
		
		return orderItems;
	}
	
	public List<OrderItem> getAllByStore(Store store) {
		List<Criterion> creterias = GlobalFilterUtility.getGlobalFilterCreteria();		
		creterias.add( Restrictions.eq("store", store));
		List<OrderItem> orderItems = orderItemService.getAllByCriteria(creterias ,null, OrderItem.class);		
		return orderItems;		 
	}

	public List<OrderItem> getOrderByDeliveryDate(Date fromDate, Date toDate) {
		List<Criterion> orderCriterias = GlobalFilterUtility.getGlobalFilterCreteria();
		LogicalExpression andExp  = Restrictions.and(Restrictions.ge("deliveryDate",fromDate), Restrictions.le("deliveryDate",toDate));
		orderCriterias.add(andExp);
		List<OrderItem> orderItemList = orderItemService.getAllByCriteria(orderCriterias, null, OrderItem.class);
		return orderItemList;
	}

	public List<OrderItemVO> convertOrderToVO(List<OrderItem> orderList) {
		List<OrderItemVO> orItVos = new ArrayList<OrderItemVO>();
		Map<Long,OrderItemVO> orderProductMap = new HashMap<Long,OrderItemVO>();
		List<Criterion> orderCriterias = GlobalFilterUtility.getGlobalFilterCreteria();
		orderCriterias.add(Restrictions.in("orderItem", orderList));
		List<OrderProduct> orderProducts = orderProductService.getAllByCriteria(orderCriterias, null, OrderProduct.class);
		for (OrderProduct orderProduct : orderProducts) {
			OrderItemVO orderItemVO =  orderProductMap.get(orderProduct.getOrderItem().getId());
			if(orderItemVO == null){
				orderItemVO = new OrderItemVO(orderProduct.getOrderItem());
				orItVos.add(orderItemVO);
				orderProductMap.put(orderProduct.getOrderItem().getId(), orderItemVO);
			}
			orderItemVO.setOrderProductString(orderProduct);
		}
		return orItVos;
	}

	public List<OrderItemVO> getGridDataForOrderPage(String status,String storeId, String month) {
		
		Map<String,OrderItemVO> orderItemMap = new HashMap<String, OrderItemVO>();
		List<OrderItemVO>  orderItemVOs = new ArrayList<OrderItemVO>();
		Map<String,Object> creteriaMap = new HashMap<String, Object>();
		Date fromDate =null;
		Date toDate = null;
		String queryStr = "";
	
		if(status !=null){
			queryStr = QueryManager.getOrderDetailWithProductStatusWise();
			creteriaMap.put("status", status);
		}else if(storeId != null ){
			queryStr = QueryManager.getOrderDetailWithProductStoreWise();
			creteriaMap.put("storeId", Long.parseLong(storeId));
		}else{
			queryStr = QueryManager.getOrderDetailWithProductDateWise();
			Map<String,Date> monthLimits = new HashMap<String, Date>();
			monthLimits = CalendarUtil.getMonthLimit(monthLimits,month);
			fromDate = monthLimits.get("fromDate");
			toDate = monthLimits.get("toDate");
			creteriaMap.put("fromDate", fromDate);
			creteriaMap.put("toDate", toDate);
		}		
		ArrayList list = (ArrayList) orderItemService.executeQuery(queryStr,creteriaMap);
		for (Object orderObj : list) { 
			Object[] orderFields = (Object[]) orderObj;	
			String orderIdStr =  orderFields[0]+"";
			OrderItemVO voObject = orderItemMap.get(orderIdStr);
			if(voObject == null){
				voObject  = new OrderItemVO();
				voObject.setId(Long.parseLong(orderIdStr));		
				voObject.setTotal(Double.parseDouble(orderFields[1]+"") );
				voObject.setStatus(orderFields[2]+"");
				voObject.setOrderProductStr(orderFields[3]+"");
				orderItemVOs.add(voObject);	
				orderItemMap.put(orderIdStr, voObject);
			}else{
				voObject.setOrderProductStr(voObject.getOrderProductStr()+","+orderFields[3]+"");
			}						
		}		
		return orderItemVOs;
	}

	public List<Map<String,String>> getOrderStatusObjectList() {
		List<Map<String,String>> ostList = new ArrayList<Map<String,String>>();
		int count = 0 ;
		for(OrderStatusType ost : OrderStatusType.values()){
			
			Map<String,String> objMap = new HashMap<String, String>();
			objMap.put("id",""+(count++));
			objMap.put("name",ost.getOrderStatusType());
			ostList.add(objMap);
		}
		return ostList;
	}	
}
