package com.storeManager.dao.hbImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;

import com.storeManager.entity.OrderProduct;

public abstract class AbstractDAOImpl<E> {


	@Autowired
	public SessionFactory sessionFactory;


	public Long insert(E e)  {
		Long created=null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			 created= (Long) session.save(e); 
			trans.commit();
			session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return created;
	}

	public Map<Long,E> insertAll(List<E> elist) {
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException exce) {
		    session = sessionFactory.openSession();
		}
		Transaction tx = session.beginTransaction();
		Map<Long,E> createdEntities = new HashMap<Long, E>();
		for (E e : elist) {
			Long created= (Long) session.save(e);
			createdEntities.put(created, e);
		}

		tx.commit();
		session.close();

		return createdEntities;
	}


	public String remove(Long id,Class<E> tempClass) {
		try {
			
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			 Transaction trans=session.beginTransaction();
		        E e = (E) session.load(tempClass, new Long(id));
		        if(null != e){
		            session.delete(e);
		        }
		        trans.commit();
		        session.close();
		} catch (Exception ex) {
		}
		return "remove successfully";
	}

	public List<E> getAll(String hql) {

		List<E> list = null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
	         list = session.createQuery(hql).list();
	         System.out.println("list size:"+list.size());
	         trans.commit();
	         session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	public List<E> getAllPaginated(String hql,int start) {
		List<E> list = null;
		int range=20;
		try {
		//	System.err.println("point");
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException e) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			Query query = session.createQuery(hql);
			query.setFirstResult(start);
			query.setMaxResults(range);
	         list = query.list();
	         trans.commit();
	         session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return list;
	}
	
	public List<E> getAllByIsDeleted(String hql, Boolean isDeleted) {
		List<E> list = null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException ex) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			Query query = session.createQuery(hql);
			query.setParameter("isDeleted", isDeleted);
	         list = query.list();
	         trans.commit();
	         session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	public E getById(Long id,Class<E> tempClass) {
		E e=null;
		Session session =null;
		Transaction trans =null;
		try {			
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException ex) {
			    session = sessionFactory.openSession();
			}
			trans=session.beginTransaction();
			  e = (E) session.get(tempClass,id);
			  trans.commit();
			  session.close();
		} catch (Exception ex) {
			ex.printStackTrace();			
		}
		return e;
	}


	public List<E> getAllByFKoreignKey(SimpleExpression selectedCrs,Class<E> tempClass) {
		List<E> list = null;
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException exce) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			Criteria cr = session.createCriteria(tempClass);			
			cr.add(selectedCrs);			
	         list = cr.list();
	         System.out.println("list size:"+list.size());
	         trans.commit();
	         session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}


	public E update(E e) {
		try {
			Session session;
			try {
			    session = sessionFactory.getCurrentSession();
			} catch (HibernateException ex) {
			    session = sessionFactory.openSession();
			}
			Transaction trans=session.beginTransaction();
			session.update(e);
	        trans.commit();
	        session.close();
	        return e;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}

	}

	public List<E> updateAll(List<E> updatableList) {
		List<E> updatedList=new ArrayList<E>();
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException exce) {
		    session = sessionFactory.openSession();
		}
		Transaction tx = session.beginTransaction();
		for (E e : updatableList) {
			session.update(e);
			updatedList.add(e);
		}
		tx.commit();
		session.close();
		return updatedList;
	}


}
