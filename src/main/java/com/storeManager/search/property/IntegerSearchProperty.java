package com.storeManager.search.property;

import com.storeManager.search.property.operator.FilterOperatorType;
import com.storeManager.search.property.operator.OrderByOperatorType;


public class IntegerSearchProperty implements SearchProperty {

	private String propertyName;
	private Integer propertyValue;
	private FilterOperatorType filterOperator;
	
	public IntegerSearchProperty(String propertyName, Integer propertyValue, FilterOperatorType filterOperator) {
		super();
		this.propertyName = propertyName;
		this.propertyValue = propertyValue;
		this.filterOperator = filterOperator;
	}

	@Override
	public FilterOperatorType getFilterOperator() {
		return filterOperator;
	}

	@Override
	public String getPropertyName() {
		return propertyName;
	}

	@Override
	public Integer getPropertyValue() {
		return propertyValue;
	}

	@Override
	public OrderByOperatorType getDefaultSortOrder() {
		return OrderByOperatorType.ASC;
	}

}
