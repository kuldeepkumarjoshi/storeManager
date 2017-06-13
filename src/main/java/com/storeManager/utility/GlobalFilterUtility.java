package com.storeManager.utility;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;

public class GlobalFilterUtility {

	public static List<Criterion> getGlobalFilterCreteria() {
		List<Criterion> creterias = new ArrayList<Criterion>();
		SimpleExpression deletedExp = Restrictions.eq("deleted", Boolean.FALSE);
		SimpleExpression activeExp = Restrictions.eq("active", Boolean.TRUE);
		
		LogicalExpression andExp  = Restrictions.and(deletedExp, activeExp);
		creterias.add(andExp);
		return creterias;
	}

	
}
