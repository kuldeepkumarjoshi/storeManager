package com.storeManager.dao;

import java.util.List;
import java.util.Map;

public interface CommanDAO<E> {

	public Long insert(E e);
	public String remove(Long id,Class<E> tempClass);
	public List<E> getAll(String hql);
	public E getById(Long id,Class<E> tempClass);
	public E update(E e);
	public List<E> updateAll(List<E> updatableList);
	public List<E> getAllByIsDeleted(String hql,Boolean isDeleted);

	public Map<Long,E> insertAll(List<E> elist);
	
	public List<E> getAllPaginated(String hql,int start);
}
