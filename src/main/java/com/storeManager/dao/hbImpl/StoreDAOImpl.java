package com.storeManager.dao.hbImpl;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.storeManager.dao.StoreDAO;
import com.storeManager.entity.Store;


@Repository("storeDAO")
public class StoreDAOImpl extends AbstractDAOImpl<Store> implements StoreDAO {

	@Override
	public List<Store> getAllByZoneId(long zoneId, String databaseString) {
		List<Store> list = null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			Criteria cr = session.createCriteria(Store.class);
			cr.add(Restrictions.eq("zoneId", zoneId));			
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
