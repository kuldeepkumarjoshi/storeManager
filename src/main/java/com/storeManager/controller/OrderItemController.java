package com.storeManager.controller;

import java.util.ArrayList;
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

import com.storeManager.business.OrderBusiness;
import com.storeManager.business.ProductBusiness;
import com.storeManager.business.StoreBusiness;
import com.storeManager.business.ZoneBusiness;
import com.storeManager.comparator.StoreLastDateComparator;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;
import com.storeManager.entity.Product;
import com.storeManager.entity.Store;
import com.storeManager.entity.Zone;
import com.storeManager.enums.OrderStatusType;
import com.storeManager.service.OrderItemService;
import com.storeManager.service.StoreService;
import com.storeManager.vo.OrderItemVO;

@Controller
@RequestMapping("/order")
public class OrderItemController {
		
		@Autowired		
		OrderItemService orderItemService;
		
		@Autowired		
		StoreService storeService;
		
		@Autowired
		StoreBusiness storeBusiness;
		
		@Autowired
		ZoneBusiness zoneBusiness;
 		
		@Autowired
		ProductBusiness productBusiness;
		
		@Autowired
		OrderBusiness orderBusiness;
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, OrderItem> getById(HttpServletRequest request,Model model){
			Map<String,OrderItem> resultMap = new HashMap<String, OrderItem>();
			
			String orderId = request.getParameter("orderId");
			
			OrderItem order  =  orderBusiness.getOrderItemById(orderId);
		
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
		

		@RequestMapping(value="/getAllByStore",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, Object> getAllByStore(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();	
			String storeId = request.getParameter("storeId");
			
			List<Zone> zones = zoneBusiness.getAllZones();
			
			List<OrderItemVO> orderVOList = orderBusiness.getGridDataForOrderPage(null,storeId,null);
			
			resultMap.put("orders", orderVOList);
			resultMap.put("zones", zones);
			return resultMap;
		}
		
		@RequestMapping(value="/getGridDataForOrderPage",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getGridDataForOrderPage(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();			
			String month = request.getParameter("month");
			String status = request.getParameter("status");
			String storeId = request.getParameter("storeId");	
		
			List<OrderItemVO> orderVOList = orderBusiness.getGridDataForOrderPage(status,storeId,month);
			List<Store> stores = storeBusiness.getAllStores();
			List<Map<String,String>>	 statusList = orderBusiness.getOrderStatusObjectList();
			resultMap.put("stores",stores);
			resultMap.put("statusList",statusList);
			resultMap.put("orderList",orderVOList);			
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
			List<Store> stores = storeBusiness.getAllStores();
			Collections.sort(stores,  new StoreLastDateComparator());
		
			resultMap.put("inprogressOrders", orders);
			resultMap.put("passiveOppotunity", stores);
			return resultMap;
		}		

		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrder(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderItem> orderList = orderBusiness.getAllOrders();
			resultMap.put("orderList",orderList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getBeforeCreate",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getBeforeCreate(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Product> productList = productBusiness.getAllProductList();
			List<OrderProduct> orderProductList = new ArrayList<OrderProduct>();
			OrderItemVO orderItemVo = new OrderItemVO();
			for (Product product : productList) {
				orderProductList.add(new OrderProduct(product)) ;
			}
			orderItemVo.setOrderProducts(orderProductList);
			List<Store> stores = storeBusiness.getAllStores();
			List<Zone> zones = zoneBusiness.getAllZones();
			List<String> statusList = orderBusiness.getOrderStatus();
			orderItemVo.setStore(stores.get(0));
			resultMap.put("orderItemVo",orderItemVo);
			resultMap.put("stores",stores);
			resultMap.put("zones",zones);
			resultMap.put("statusList",statusList);
			return resultMap;
		}
		
		@RequestMapping(value="/getBeforeEdit",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getBeforeEdit(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String orderId = request.getParameter("orderId");
			OrderItemVO orderItemVo = orderBusiness.getOrderItemVO(orderId);
			
			List<Store> stores = storeBusiness.getAllStores();
			List<Zone> zones = zoneBusiness.getAllZones();
			List<String> statusList = orderBusiness.getOrderStatus();
			resultMap.put("orderItemVo",orderItemVo);
			resultMap.put("stores",stores);
			resultMap.put("zones",zones);
			resultMap.put("statusList",statusList);
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
		public Map<String,String> deleteOrder(HttpServletRequest request){
			Map<String,String> resultMap = new HashMap<String, String>();
			String orderID = request.getParameter("id");
			try{
			orderBusiness.deleleOrder(Long.parseLong(orderID));
			//System.out.println( request.getSession().getAttributeNames());
			}catch(Exception e){
				e.printStackTrace();
				 resultMap.put("error", "error");
			}
			 resultMap.put("success", "success");
			 return resultMap;
		}
		
		
		@RequestMapping(value="/update",method=RequestMethod.PUT)
		@ResponseBody
		public String updateOrder(HttpServletRequest request,Model model){
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
