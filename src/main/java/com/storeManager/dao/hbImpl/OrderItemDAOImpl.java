package com.storeManager.dao.hbImpl;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.storeManager.dao.OrderItemDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.mail.MailSenderThread;
import com.storeManager.utility.MailUtil;

@Repository("orderItemDAO")
public class OrderItemDAOImpl extends AbstractDAOImpl<OrderItem> implements OrderItemDAO {
	
	@Autowired
	MailSenderThread mailSenderThread ;

	@Override
	public Long insert(OrderItem orderItem) {
		Long orderitemId = super.insert(orderItem);		
		orderItem.setId(orderitemId);
		if(MailUtil.canSendMail(orderItem)){
			mailSenderThread.setOrderItem(orderItem);
		}	
		return orderitemId;		
	}
	
	@Override
	public OrderItem update(OrderItem orderItem) {
		OrderItem orderitem = super.update(orderItem);
		if(MailUtil.canSendMail(orderItem)){
			mailSenderThread.sendOrderMail(orderItem);
		}
		return orderitem;
		
	}

	@Override
	public List<OrderItem> getByOrderStatus(String status, Class<OrderItem> className) {
		List<OrderItem> list = null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			Criteria cr = session.createCriteria(OrderItem.class);
			cr.add(Restrictions.eq("status", status));			
	         list = cr.list();
	         System.out.println("list size:"+list.size());
	         trans.commit();
	         session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

}
