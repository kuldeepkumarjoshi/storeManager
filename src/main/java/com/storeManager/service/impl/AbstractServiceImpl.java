package com.storeManager.service.impl;

import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.SimpleExpression;

import com.storeManager.dao.CommanDAO;
import com.storeManager.entity.Store;


public abstract class AbstractServiceImpl<E> {


	private CommanDAO<E> objectDao;

	public abstract Object getObjectDao();

	
	public Long insert(E e)  {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.insert(e);
	}

	public Map<Long,E> insertAll(List<E> elist) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.insertAll(elist);
	}


	public String remove(Long id,Class<E> tempClass) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.remove(id, tempClass);
	}

	
	public List<E> getAllByFKoreignKey(SimpleExpression spe,Class<E> tempClass) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getAllByFKoreignKey(spe, tempClass);
	}

	public List<E> getAllByCriteria(SimpleExpression selectedCrs,Class<E> tempClass) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getAllByCriteria(selectedCrs, tempClass);
	}
	public List<E> getAllByCriteria(List<Criterion> criterias,Class<E> tempClass) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getAllByCriteria(criterias, tempClass);
	}
	
	public List<E> getAll(String hql) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getAll(hql);
	}

	
	public List<E> getAllPaginated(String hql,int start) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getAllPaginated(hql,start);
	}
	
	public List<E> getAllByIsDeleted(String hql, Boolean isDeleted) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getAllByIsDeleted(hql, isDeleted);
	}

	public E getById(Long id,Class<E> tempClass) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.getById(id, tempClass);
	}

	public E update(E e) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.update(e);
	}

	public List<E> updateAll(List<E> updatableList) {
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.updateAll(updatableList);
	}
	
	public E updateByCondition(E e, Class<E> tempClass,Map<String, Object> setterParams, Map<String, Object> creteriaMap){
		objectDao = (CommanDAO<E>) getObjectDao();
		return objectDao.updateByCondition(e, tempClass, setterParams,  creteriaMap);
	}


}
