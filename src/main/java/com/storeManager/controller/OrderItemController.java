package com.storeManager.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeManager.entity.OrderItem;
import com.storeManager.service.OrderItemService;

@Controller
@RequestMapping("/order")
public class OrderItemController {
		
		@Autowired		
		@Qualifier("orderItemServiceImpl")
		OrderItemService orderService;
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, OrderItem> getById(HttpServletRequest request,Model model){
			Map<String,OrderItem> resultMap = new HashMap<String, OrderItem>();
			
			String orderId = request.getParameter("orderId");
			
			
			OrderItem order  = orderService.getById(Long.parseLong(orderId),OrderItem.class);
			resultMap.put("order", order);
			return resultMap;
		}
		
		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrder(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderItem> orderList = orderService.getAll("from OrderItem");
			resultMap.put("orderList",orderList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllPaginated",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrderPaginated(HttpServletRequest request){
			int start =Integer.parseInt(request.getParameter("start"));
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderItem> orderList = orderService.getAllPaginated("from OrderItem",start);
			resultMap.put("orderList",orderList);			
			return resultMap;
		}
		
		@RequestMapping(value="/delete",method=RequestMethod.DELETE)
		@ResponseBody
		public String deleteOrder(HttpServletRequest request){
			String orderID = request.getParameter("id");
			//System.out.println( request.getSession().getAttributeNames());
			orderService.remove(Long.parseLong(orderID),OrderItem.class);			
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
			orderService.update(order);
		
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
			orderService.insert(order);
			resultMap.put("order", order);
			return resultMap;
		}
		
	
}
