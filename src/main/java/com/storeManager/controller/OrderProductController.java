package com.storeManager.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.storeManager.business.OrderBusiness;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;
import com.storeManager.service.OrderItemService;
import com.storeManager.service.OrderProductService;
import com.storeManager.vo.OrderItemVO;

@Controller
@RequestMapping("/orderProduct")
public class OrderProductController {
		
		@Autowired		
		OrderProductService orderProductService;
		
		@Autowired		
		OrderItemService orderItemService;
		
		@Autowired
		OrderBusiness orderBusiness; 
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, OrderProduct> getById(HttpServletRequest request,Model model){
			Map<String,OrderProduct> resultMap = new HashMap<String, OrderProduct>();
			
			String orderProductId = request.getParameter("orderProductId");
			
			
			OrderProduct orderProduct  = orderProductService.getById(Long.parseLong(orderProductId),OrderProduct.class);
			resultMap.put("orderProduct", orderProduct);
			return resultMap;
		}
		
		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrderProduct(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderProduct> orderProductList = orderProductService.getAll("from OrderProduct");
			resultMap.put("orderProductList",orderProductList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllPaginated",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrderProductPaginated(HttpServletRequest request){
			int start =Integer.parseInt(request.getParameter("start"));
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<OrderProduct> orderProductList = orderProductService.getAllPaginated("from OrderProduct",start);
			resultMap.put("orderProductList",orderProductList);			
			return resultMap;
		}
		
		@RequestMapping(value="/delete",method=RequestMethod.DELETE)
		@ResponseBody
		public String deleteOrderProduct(HttpServletRequest request){
			String orderProductID = request.getParameter("id");
			//System.out.println( request.getSession().getAttributeNames());
			orderProductService.remove(Long.parseLong(orderProductID),OrderProduct.class);			
			return "success";
		}
		
		
		@RequestMapping(value="/update",method=RequestMethod.PUT)
		@ResponseBody
		public String updateOrderProduct(HttpServletRequest request,Model model){
			String name = request.getParameter("name");
			String price = request.getParameter("price");
			String symbol = request.getParameter("symbol");
			OrderProduct product = new OrderProduct();
		
			//System.out.println( request.getSession().getAttributeNames());
			orderProductService.update(product);
		
			return "success";
		}
		
		@RequestMapping(value="/save",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> saveOrderProduct(@RequestBody OrderItemVO orderItemVO, HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			Map<Long, OrderProduct> saveMap = null;
			OrderItem orderItem = new OrderItem(orderItemVO);
			if(orderItemVO.getId() == null){
				Long orderItemId = orderBusiness.insert(orderItem);
				orderItem.setId(orderItemId);				
			}else{
				orderItem = orderItemService.update(orderItem);
			}
			List<OrderProduct> createOrderProduct = new ArrayList<OrderProduct>();
			List<OrderProduct> updateOrderProduct = new ArrayList<OrderProduct>();
			for (OrderProduct orderproduct : orderItemVO.getOrderProducts()) {
				
				if(orderproduct.getQuantity()!=0){
					orderproduct.setOrderId(orderItem.getId());
					orderproduct.setOrderItem(orderItem);
					if(orderproduct.getId() == null){
						createOrderProduct.add(orderproduct);
					}else{
						updateOrderProduct.add(orderproduct);						
					}
				}else{
					if(orderproduct.getId() != null){
						orderproduct.setDeleted(Boolean.TRUE);
						updateOrderProduct.add(orderproduct);
					}
				}
			}			
			System.out.println("product::"+createOrderProduct);
			saveMap = orderProductService.insertAll(createOrderProduct);
			updateOrderProduct = orderProductService.updateAll(updateOrderProduct);
			resultMap.put("success", "order saved successfully.");
			return resultMap;
		}
		
	
}
