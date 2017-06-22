package com.storeManager.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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

import com.storeManager.business.ZoneBusiness;
import com.storeManager.entity.Zone;
import com.storeManager.service.ZoneService;
import com.storeManager.utility.CalendarUtil;
import com.storeManager.vo.ZoneDetailVo;

@Controller
@RequestMapping("/zone")
public class ZoneController {
		
		@Autowired		
		ZoneService zoneService;
		
		@Autowired
		ZoneBusiness zoneBusiness;
		
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
			List<Zone> zoneList = zoneBusiness.getAllZones();
			resultMap.put("zoneList",zoneList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllZonesForZonePage",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllZonesForZonePage(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String fromDateStr = request.getParameter("fromDate");
			String month = request.getParameter("month");
			String toDateStr = request.getParameter("toDate");
			Date fromDate =null;
			Date toDate = null;
			Map<String,Date> monthLimits = new HashMap<String, Date>();
			try {
				
					if(fromDateStr !=null && toDateStr !=null){
						//SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");					
							fromDate = new Date(Long.parseLong(fromDateStr));
							toDate = new Date(Long.parseLong(toDateStr));						
					}else{
						monthLimits = CalendarUtil.getMonthLimit(monthLimits,month);
						fromDate = monthLimits.get("fromDate");
						toDate = monthLimits.get("toDate");
						
					}
				
				System.out.println("from :"+fromDate+" toDate :"+toDate);
				List<ZoneDetailVo> zoneList = zoneBusiness.getAllZonesForZonePage(fromDate,toDate);
				resultMap.put("zoneList",zoneList);
				resultMap.put("fromDate", fromDate.getTime());
				resultMap.put("toDate", toDate.getTime());
				} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
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
		public Map<String,String> deleteOrder(HttpServletRequest request){
			Map<String,String> resultMap = new HashMap<String, String>();
			String zoneID = request.getParameter("zoneId");
			try{
				zoneBusiness.deleleZone(Long.parseLong(zoneID));
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
		public Map<String,Object> saveZone(@RequestBody Zone zone ,HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			
			if(zone.getId() == null ){
				zoneService.insert(zone);
			}else{
				zoneService.update(zone);
			}
			System.out.println("zone::"+zone);
			
			resultMap.put("zone", zone);
			return resultMap;
		}
		
	
}
