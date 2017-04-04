package com.storeManager.service.impl;

import java.util.List;
import java.util.Map;

import com.storeManager.dao.CommanDAO;


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

}
