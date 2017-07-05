package com.storeManager.search.property;

import com.storeManager.search.property.operator.FilterOperatorType;
import com.storeManager.search.property.operator.OrderByOperatorType;


/**
 * 
 * Represents a filter of a search request.
 * @author prateek
 *
 */
public interface SearchProperty {	
	String getPropertyName();
	Object getPropertyValue();
	FilterOperatorType getFilterOperator();
	public OrderByOperatorType getDefaultSortOrder();
	
}
