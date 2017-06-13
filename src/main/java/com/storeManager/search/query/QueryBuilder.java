package com.storeManager.search.query;

import com.storeManager.search.FilterRecordRange;
import com.storeManager.search.property.OrderByProperty;
import com.storeManager.search.property.SearchProperty;
import com.storeManager.search.property.operator.FilterGroupOperatorType;

/**
 * A QueryBuilder contract for building a Query using the general fragments of a
 * query framework i.e a From, Filter(Where), Order BY and Range limit. Can be
 * enhanced to add Projections(Select) if needed.
 * 
 * @author prateek
 * 
 */
public interface QueryBuilder {
	void addFrom(Class entityType) throws Exception;

	void addFilter(SearchProperty searchProperty, FilterGroupOperatorType groupOperator) throws Exception;

	void addOrderBy(OrderByProperty property) throws Exception;

	void addFetchRange(FilterRecordRange range) throws Exception;

	Query buildCompleteQuery() throws Exception;
}
