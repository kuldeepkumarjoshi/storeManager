package com.storeManager.comparator;

import java.util.Comparator;

import com.storeManager.entity.Store;
public class  StoreLastDateComparator  implements Comparator<Store>{

	@Override
	public int compare(Store store1, Store store2) {
		
		 if (store1.getMostRecentOrderDate().before(store2.getMostRecentOrderDate())) {
	            return -1;
	        } else if (store1.getMostRecentOrderDate().after(store2.getMostRecentOrderDate())) {
	            return 1;
	        } else {
	            return 0;
	        }    
		
	}

}