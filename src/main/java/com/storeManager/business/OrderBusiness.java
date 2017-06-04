package com.storeManager.business;

import java.util.ArrayList;
import java.util.List;

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
import com.storeManager.service.ZoneService;

@Component
public class OrderBusiness {

	@Autowired		
	ZoneService zoneService;
	
	@Autowired		
	OrderItemService orderItemService;
	
	@Autowired		
	OrderProductService orderProductService;

	public List<Zone> getAllZones() {
		List<Zone> zoneList = zoneService.getAll("from Zone");
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

	
	
}
