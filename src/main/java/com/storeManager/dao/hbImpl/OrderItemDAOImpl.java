package com.storeManager.dao.hbImpl;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.storeManager.dao.OrderItemDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.utility.MailUtil;

@Repository("orderItemDAO")
public class OrderItemDAOImpl extends AbstractDAOImpl<OrderItem> implements OrderItemDAO {
	
	@Override
	public Long insert(OrderItem orderItem) {
		Long orderitemId = super.insert(orderItem);
		
		try {
			String email = "kkuldeepjoshi5@gmail.com";
			if(orderItem.getStore() !=null){
				email = orderItem.getStore().getEmail();
			}
					MailUtil.sendMail("order created successfully ",email,"Order success : "+orderitemId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return orderitemId;
		
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
