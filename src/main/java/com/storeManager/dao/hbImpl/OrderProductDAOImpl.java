package com.storeManager.dao.hbImpl;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.storeManager.dao.OrderProductDAO;
import com.storeManager.entity.OrderItem;
import com.storeManager.entity.OrderProduct;


@Repository("orderProductDAO")
public class OrderProductDAOImpl extends AbstractDAOImpl<OrderProduct> implements OrderProductDAO {

	@Override
	public List<OrderProduct> getAllByOrderItem(OrderItem orderItem) {
		List<OrderProduct> list = null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			Criteria cr = session.createCriteria(OrderProduct.class);
			
			cr.add(Restrictions.eq("orderItem", orderItem));			
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
