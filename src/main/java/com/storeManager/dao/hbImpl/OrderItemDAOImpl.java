package com.storeManager.dao.hbImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.storeManager.dao.OrderItemDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.mail.MailService;

@Component
public class OrderItemDAOImpl extends AbstractDAOImpl<OrderItem> implements OrderItemDAO {

	@Autowired
	MailService mailService;
	
	@Override
	public Long insert(OrderItem orderItem) {
		Long orderitemId = super.insert(orderItem);
		
		try {
			mailService.sendMail("order created successfully ",orderItem.getStore().getEmail(),"Order success : "+orderitemId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return orderitemId;
		
	}
}
