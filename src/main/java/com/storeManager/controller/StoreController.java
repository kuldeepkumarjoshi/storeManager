package com.storeManager.controller;

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

import com.storeManager.business.StoreBusiness;
import com.storeManager.business.ZoneBusiness;
import com.storeManager.entity.Store;
import com.storeManager.entity.Zone;
import com.storeManager.service.StoreService;

@Controller
@RequestMapping("/store")
public class StoreController {
		
		@Autowired		
		StoreService storeService;
		
		@Autowired
		StoreBusiness storeBusiness;
		
		@Autowired
		ZoneBusiness zoneBusiness;
			
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
			
			List<Store> storeList = storeBusiness.getAllStores();
		
			resultMap.put("storeList",storeList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllByZoneId",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllByZoneId(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String zoneId = request.getParameter("zoneId");
			List<Store> storeList = storeService.getAllByZoneId(Long.parseLong(zoneId),"from Store");
			resultMap.put("storeList",storeList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getBeforeCreate",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getBeforeCreate(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();			
			List<Zone> zones = zoneBusiness.getAllZones();			
			resultMap.put("zones",zones);
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
		public Map<String,String> deleteStore(HttpServletRequest request){
			Map<String,String> resultMap = new HashMap<String, String>();
			String storeID = request.getParameter("storeId");
			try{
			storeBusiness.deleleStore(Long.parseLong(storeID));
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
		public String updateStore(HttpServletRequest request,Model model){
			Store store = new Store();
		
			//System.out.println( request.getSession().getAttributeNames());
			storeService.update(store);
		
			return "success";
		}
		
		@RequestMapping(value="/save",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> saveStore(@RequestBody Store store ,HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			if(store.getId() == null){
				store.setId( storeService.insert(store));
			}else{
				store = storeService.update(store);
			}
			resultMap.put("store", store);
			return resultMap;
		}
		
	
}
