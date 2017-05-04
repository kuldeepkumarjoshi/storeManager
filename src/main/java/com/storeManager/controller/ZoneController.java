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

import com.storeManager.entity.Zone;
import com.storeManager.service.ZoneService;

@Controller
@RequestMapping("/zone")
public class ZoneController {
		
		@Autowired		
		ZoneService zoneService;
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, Zone> getById(HttpServletRequest request,Model model){
			Map<String,Zone> resultMap = new HashMap<String, Zone>();
			
			String zoneId = request.getParameter("zoneId");
			
			
			Zone zone  = zoneService.getById(Long.parseLong(zoneId),Zone.class);
			resultMap.put("zone", zone);
			return resultMap;
		}
		
		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllZone(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Zone> zoneList = zoneService.getAll("from Zone");
			resultMap.put("zoneList",zoneList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllPaginated",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllZonePaginated(HttpServletRequest request){
			int start =Integer.parseInt(request.getParameter("start"));
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Zone> zoneList = zoneService.getAllPaginated("from Zone",start);
			resultMap.put("zoneList",zoneList);			
			return resultMap;
		}
		
		@RequestMapping(value="/delete",method=RequestMethod.DELETE)
		@ResponseBody
		public String deleteZone(HttpServletRequest request){
			String zoneID = request.getParameter("id");
			//System.out.println( request.getSession().getAttributeNames());
			zoneService.remove(Long.parseLong(zoneID),Zone.class);			
			return "success";
		}
		
		
		@RequestMapping(value="/update",method=RequestMethod.PUT)
		@ResponseBody
		public String updateZone(HttpServletRequest request,Model model){
			String name = request.getParameter("name");
			String price = request.getParameter("price");
			String symbol = request.getParameter("symbol");
			Zone zone = new Zone();
		
			//System.out.println( request.getSession().getAttributeNames());
			zoneService.update(zone);
		
			return "success";
		}
		
		@RequestMapping(value="/save",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> saveZone(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String zoneName = request.getParameter("zoneName");
			System.out.println("zone name::"+zoneName);
			
			Zone zone = new Zone();
			System.out.println("zone::"+zone);
			zoneService.insert(zone);
			resultMap.put("zone", zone);
			return resultMap;
		}
		
	
}
