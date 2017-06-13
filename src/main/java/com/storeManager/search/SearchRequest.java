package com.storeManager.search;

import java.util.List;

import com.storeManager.search.property.OrderByProperty;
import com.storeManager.search.property.operator.FilterGroupOperatorType;


public class SearchRequest {

	//child or relationship entities criteria
	private List<SearchCriteria> searchCriterias;

	// order by
	private List<OrderByProperty> orderbyProperties;

	// group operation
	private FilterGroupOperatorType groupOp;
	
	public enum ResultType	{
		Key,Entity;
	} 
	
	private ResultType resultType;
	

	//filter range
	private FilterRecordRange range;

	
	public SearchRequest( List<SearchCriteria> searchCriterias,
			List<OrderByProperty> propertyNames, FilterGroupOperatorType groupOp,FilterRecordRange range, ResultType resultType) {
		super();		

		this.searchCriterias = searchCriterias;
		this.orderbyProperties = propertyNames;
		this.groupOp = groupOp;
		this.range = range;
		this.resultType = resultType;
	}

	public ResultType getResultType() {
		return resultType;
	}

	public void setResultType(ResultType resultType) {
		this.resultType = resultType;
	}

	public List<SearchCriteria> getSearchCriterias() {
		return searchCriterias;
	}

	public List<OrderByProperty> getOrderbyProperties() {
		return orderbyProperties;
	}
	
	public void setOrderbyProperties(List<OrderByProperty> orderbyProperties) {
		this.orderbyProperties = orderbyProperties;
	}

	public FilterGroupOperatorType getGroupOp() {
		return groupOp;
	}

	public FilterRecordRange getRange() {
		return range;
	}

	public void setRange(FilterRecordRange range) {
		this.range = range;
	}
	
	
}
