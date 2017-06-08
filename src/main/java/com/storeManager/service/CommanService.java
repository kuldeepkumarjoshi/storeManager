package com.storeManager.service;

import java.util.List;
import java.util.Map;

import org.hibernate.criterion.SimpleExpression;

import com.storeManager.entity.Store;


public interface CommanService<E> {

	public Long insert(E e);
	public String remove(Long id,Class<E> tempClass);
	public List<E> getAll(String hql);
	public E getById(Long id,Class<E> tempClass);
	public E update(E e);
	public List<E> updateAll(List<E> updatableList);
	public List<E> getAllByIsDeleted(String hql,Boolean isDeleted);

	public Map<Long,E> insertAll(List<E> elist);

	public List<E> getAllPaginated(String hql,int start);
	public List<E> getAllByFKoreignKey(SimpleExpression spe , Class<E> tempClass);
	public E updateByCondition(Store store, Class<Store> tempClass,Map<String, Object> setterParams, Map<String, Object> creteriaMap);

}
