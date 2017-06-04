package com.storeManager.controller;

import java.util.ArrayList;
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

import com.storeManager.business.ProductBusiness;
import com.storeManager.entity.OrderProduct;
import com.storeManager.entity.Product;
import com.storeManager.service.ProductService;

@Controller
@RequestMapping("/product")
public class ProductController {
		
		@Autowired		
		ProductService productService;
		
		@Autowired
		ProductBusiness productBusiness;
		
		@RequestMapping(value="/getById",method=RequestMethod.GET)
		@ResponseBody
		public Map<String, Product> getById(HttpServletRequest request,Model model){
			Map<String,Product> resultMap = new HashMap<String, Product>();
			
			String productId = request.getParameter("productId");
			
			
			Product product  = productService.getById(Long.parseLong(productId),Product.class);
			resultMap.put("product", product);
			return resultMap;
		}
		
		@RequestMapping(value="/getAll",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllProduct(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Product> productList = productService.getAll("from Product");
			resultMap.put("productList",productList);			
			return resultMap;
		}
		
		@RequestMapping(value="/getAllOrderProducts",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllOrderProducts(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Product> productList = productBusiness.getAllProductList();
			
			List<OrderProduct> orderProductList = new ArrayList<OrderProduct>();
			for (Product product : productList) {
				orderProductList.add(new OrderProduct(product)) ;
			}
			resultMap.put("productList",orderProductList);			
			return resultMap;
		}		
		
		

		@RequestMapping(value="/getAllPaginated",method=RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> getAllProductPaginated(HttpServletRequest request){
			int start =Integer.parseInt(request.getParameter("start"));
			Map<String,Object> resultMap = new HashMap<String, Object>();
			List<Product> productList = productService.getAllPaginated("from Product",start);
			resultMap.put("productList",productList);			
			return resultMap;
		}
		
		@RequestMapping(value="/delete",method=RequestMethod.DELETE)
		@ResponseBody
		public String deleteProduct(HttpServletRequest request){
			String productID = request.getParameter("id");
			//System.out.println( request.getSession().getAttributeNames());
			productService.remove(Long.parseLong(productID),Product.class);			
			return "success";
		}
		
		
		@RequestMapping(value="/update",method=RequestMethod.PUT)
		@ResponseBody
		public String updateProduct(HttpServletRequest request,Model model){
			
			Product product = new Product();
		
			//System.out.println( request.getSession().getAttributeNames());
			productService.update(product);
		
			return "success";
		}
		
		@RequestMapping(value="/save",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> saveProduct(HttpServletRequest request){
			Map<String,Object> resultMap = new HashMap<String, Object>();
			String productName = request.getParameter("productName");
			System.out.println("product name::"+productName);
			
			Product product = new Product();
			System.out.println("product::"+product);
			productService.insert(product);
			resultMap.put("product", product);
			return resultMap;
		}
		
	
}
