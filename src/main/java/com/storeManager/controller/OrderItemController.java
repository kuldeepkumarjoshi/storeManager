package com.storeManager.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeManager.comparator.StoreLastDateComparator;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.Store;
import com.storeManager.enums.OrderStatusType;
import com.storeManager.service.OrderItemService;
import com.storeManager.service.StoreService;

@Controller
@RequestMapping("/order")
public class OrderItemController {
		
		@Autowired		
		OrderItemService orderItemService;
		
		@Autowired		
		StoreService storeService;
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, OrderItem> getById(HttpServletRequest request,Model model){
			Map<String,OrderItem> resultMap = new HashMap<String, OrderItem>();
			
			String orderId = request.getParameter("orderId");
			
			
			OrderItem order  = orderItemService.getById(Long.parseLong(orderId),OrderItem.class);
			resultMap.put("order", order);
			return resultMap;
		}
		
		@RequestMapping(value="/getByOrderStatus",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, Object> getByOrderStatus(HttpServletRequest request,Model model){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			
			String status = request.getParameter("status");
			List<OrderItem> orders  = orderItemService.getByOrderStatus(status,OrderItem.class);
			resultMap.put("orders", orders);
			return resultMap;
		}
		
		@RequestMapping(value="/getDashBoardDetail",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, Object> getDashBoardDetail(HttpServletRequest request,Model model){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			
			String status = request.getParameter("status");
			if(status==null || status.isEmpty()){
				status = OrderStatusType.IN_PROGRESS.toString();
			}
			List<OrderItem> orders  = orderItemService.getByOrderStatus(status,OrderItem.class);
			List<Store> stores = storeService.getAll("from Store");
			Collections.sort(stores,  new StoreLastDateComparator());
		
			resultMap.put("inprogressOrders", orders);
			resultMap.put("passiveOppotunity", stores);
			return resultMap;
		}		

		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrder(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderItem> orderList = orderItemService.getAll("from OrderItem");
			resultMap.put("orderList",orderList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllPaginated",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrderPaginated(HttpServletRequest request){
			int start =Integer.parseInt(request.getParameter("start"));
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderItem> orderList = orderItemService.getAllPaginated("from OrderItem",start);
			resultMap.put("orderList",orderList);			
			return resultMap;
		}
		
		@RequestMapping(value="/delete",method=RequestMethod.DELETE)
		@ResponseBody
		public String deleteOrder(HttpServletRequest request){
			String orderID = request.getParameter("id");
			//System.out.println( request.getSession().getAttributeNames());
			orderItemService.remove(Long.parseLong(orderID),OrderItem.class);			
			return "success";
		}
		
		
		@RequestMapping(value="/update",method=RequestMethod.PUT)
		@ResponseBody
		public String updateOrder(HttpServletRequest request,Model model){
			String name = request.getParameter("name");
			String price = request.getParameter("price");
			String symbol = request.getParameter("symbol");
			OrderItem order = new OrderItem();
		
			//System.out.println( request.getSession().getAttributeNames());
			orderItemService.update(order);
		
			return "success";
		}
		
		@RequestMapping(value="/save",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> saveOrder(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String orderName = request.getParameter("orderName");
			System.out.println("order name::"+orderName);
			
			OrderItem order = new OrderItem();
			System.out.println("order::"+order);
			orderItemService.insert(order);
			resultMap.put("order", order);
			return resultMap;
		}
		
	
}
