package com.storeManager.search;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Repository;

import com.storeManager.search.property.OrderByProperty;
import com.storeManager.search.property.operator.FilterGroupOperatorType;
import com.storeManager.search.property.operator.FilterOperatorType;
import com.storeManager.search.query.InequalityRestrictionHandler;

@Repository
public class SearchService {
	
	@Autowired
	private ApplicationContext applicationContext;

	

	public SearchResult doSearch(SearchRequest searchRequest) throws Exception {
		
		final int batchSize = 500;
		
		FilterRecordRange currentFilterRecordRange = searchRequest.getRange();
		
		List<Object> resultObjects = new ArrayList<Object>();
		FilterRecordRange recordRange = searchRequest.getRange();
		List<OrderByProperty> orderbyProperties = searchRequest.getOrderbyProperties();
		FilterGroupOperatorType groupOp = searchRequest.getGroupOp();
		
		SearchResult resultsVO = null;
		InequalityRestrictionHandler inequalityRestrictionHandler = new InequalityRestrictionHandler(searchRequest);
		
		List<Object> finalList = new ArrayList<Object>();

				try {
					
					//	FilterRecordRange filterRecordRange = new FilterRecordRange(count, count + batchSize);

					//	searchRequest.setRange(filterRecordRange);
					//	currentObjectList = fetchSearchResults(searchRequest).getResultObjects();
					//	finalList.addAll(currentObjectList);
						
				} catch (IllegalArgumentException illegalArgumentException) {
						illegalArgumentException.printStackTrace();
				}
				resultObjects.addAll(finalList);
		

		SearchResult searchResult = new SearchResult(resultObjects,Object.class,currentFilterRecordRange,(long) (resultObjects.size()));
		return searchResult;
	}

	
		
	private boolean compareObjects(Object property1, Object property2,FilterOperatorType operatorType) {
		boolean isValidSearchValue = false;
		switch (operatorType) {

		case EQUAL:
				if (property1 == null && property2 == null)
				return true;
			isValidSearchValue = property1.equals(property2);
			break;
		case NOT_EQUAL:
			if (property1 == null && property2 != null)
				return true;
			isValidSearchValue = !property1.equals(property2);
			break;
		case GREATER_THAN:
			if (property1 != null) {
				if (property1 instanceof Date) {
					isValidSearchValue = ((Date) property1)
							.after((Date) property2);
				} else if (property1 instanceof Double) {
					isValidSearchValue = (Double) property1 > (Double) property2;
				}
			}
			break;
		case LESS_THAN:
			if (property1 != null) {
				if (property1 instanceof Date) {
					isValidSearchValue = ((Date) property1)
							.before((Date) property2);
				} else if (property1 instanceof Double) {
					isValidSearchValue = (Double) property1 < (Double) property2;
				}
			}
			break;
		case STARTS_WITH:
			if (property1 != null) {
				if (property1 instanceof String) {
					isValidSearchValue = ((String) property1)
							.startsWith(((String) property2));
				}
			}
			break;
		case ENDS_WITH:
			if (property1 != null) {
				if (property1 instanceof String) {
					isValidSearchValue = ((String) property1)
							.endsWith(((String) property2));
				}
			}
			break;
		case GREATER_THAN_EQUAL:
			if (property1 != null) {
				if (property1 instanceof Date) {
					isValidSearchValue = ((Date) property1)
							.after((Date) property2);
				} else if (property1 instanceof Double) {
					isValidSearchValue = (Double) property1 > (Double) property2;
				}
				isValidSearchValue = isValidSearchValue
						|| property1.equals(property2);
			}
			break;
		case LESS_THAN_EQUAL:
			if (property1 != null) {
				if (property1 instanceof Date) {
					isValidSearchValue = ((Date) property1)
							.before((Date) property2);
				} else if (property1 instanceof Double) {
					isValidSearchValue = (Double) property1 < (Double) property2;
				}
				isValidSearchValue = (isValidSearchValue || property1
						.equals(property2));
			}
			break;

		}
		return isValidSearchValue;
	}


}