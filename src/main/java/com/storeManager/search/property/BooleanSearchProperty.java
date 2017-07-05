package com.storeManager.search.property;

import com.storeManager.search.property.operator.FilterOperatorType;
import com.storeManager.search.property.operator.OrderByOperatorType;


public class BooleanSearchProperty implements SearchProperty {

	private String propertyName;
	private Boolean propertyValue;
	private FilterOperatorType filterOperator;
	
	public BooleanSearchProperty(String propertyName, Boolean propertyValue, FilterOperatorType filterOperator) {
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
	public Boolean getPropertyValue() {
		return propertyValue;
	}
	public OrderByOperatorType getDefaultSortOrder() {
		return OrderByOperatorType.ASC;
	}

	@Override
	public String toString() {
		return "BooleanSearchProperty [propertyName=" + propertyName + ", propertyValue=" + propertyValue
				+ ", filterOperator=" + filterOperator + "]";
	}

	
	

}
