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

import com.storeManager.entity.Store;
import com.storeManager.service.StoreService;

@Controller
@RequestMapping("/store")
public class StoreController {
		
		@Autowired		
		@Qualifier("storeServiceImpl")
		StoreService storeService;
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, Store> getById(HttpServletRequest request,Model model){
			Map<String,Store> resultMap = new HashMap<String, Store>();
			
			String storeId = request.getParameter("storeId");
			
			
			Store store  = storeService.getById(Long.parseLong(storeId),Store.class);
			resultMap.put("store", store);
			return resultMap;
		}
		
		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllStore(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Store> storeList = storeService.getAll("from Store");
			resultMap.put("storeList",storeList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllPaginated",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllStorePaginated(HttpServletRequest request){
			int start =Integer.parseInt(request.getParameter("start"));
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Store> storeList = storeService.getAllPaginated("from Store",start);
			resultMap.put("storeList",storeList);			
			return resultMap;
		}
		
		@RequestMapping(value="/delete",method=RequestMethod.DELETE)
		@ResponseBody
		public String deleteStore(HttpServletRequest request){
			String storeID = request.getParameter("id");
			//System.out.println( request.getSession().getAttributeNames());
			storeService.remove(Long.parseLong(storeID),Store.class);			
			return "success";
		}
		
		
		@RequestMapping(value="/update",method=RequestMethod.PUT)
		@ResponseBody
		public String updateStore(HttpServletRequest request,Model model){
			String name = request.getParameter("name");
			String price = request.getParameter("price");
			String symbol = request.getParameter("symbol");
			Store store = new Store();
		
			//System.out.println( request.getSession().getAttributeNames());
			storeService.update(store);
		
			return "success";
		}
		
		@RequestMapping(value="/save",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> saveStore(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String storeName = request.getParameter("storeName");
			System.out.println("store name::"+storeName);
			
			Store store = new Store();
			System.out.println("store::"+store);
			storeService.insert(store);
			resultMap.put("store", store);
			return resultMap;
		}
		
	
}
