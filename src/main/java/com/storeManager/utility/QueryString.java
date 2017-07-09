package com.storeManager.utility;

public final class QueryString {

	public static final String ZONE_DETAIL_WITH_TOTAL_SALE = " SELECT z.id, z.name, storeCount , storeSum	FROM zone as z  LEFT OUTER JOIN "+
			" ( SELECT st.zoneId,count(st.id) as storeCount , sum(ot.total) as storeSum FROM store as st LEFT OUTER JOIN orderItem as ot ON st.id = ot.storeId "+
			" AND ot.deliverydate >= :fromDate AND ot.deliverydate <= :toDate AND st.deleted = false AND st.active = true AND ot.deleted = false AND "+
			" ot.active = true GROUP BY st.zoneId ) as q2 ON z.id = q2.zoneId  AND z.deleted = false AND z.active = true  ";
	
	public static final String ORDER_DETAIL_WITH_PRODUCT_DATE_WISE = "select opi.id,opi.total,opi.status,pr.name,opi.poNumber from ( "+
			" select oi.id,oi.total,oi.status, op.productId,oi.poNumber from orderItem oi Inner join orderProduct op on oi.id = op.orderId "+ 
			" where  oi.deliverydate >= :fromDate AND oi.deliverydate <= :toDate AND oi.deleted = false AND "+ 
			" oi.active = true and op.deleted = false AND op.active = true) opi, product pr "+ 
			" where   pr.id = opi.productId and pr.active = true and pr.deleted = false ";
	
	public static final String ORDER_DETAIL_WITH_PRODUCT_STATUS_WISE = "select opi.id,opi.total,opi.status,pr.name,opi.poNumber from ( "+
			" select oi.id,oi.total,oi.status, op.productId ,oi.poNumber from orderItem oi Inner join orderProduct op on oi.id = op.orderId "+ 
			" where  oi.status= :status AND oi.deleted = false AND oi.active = true and op.deleted = false AND op.active = true) "+
			" opi, product pr where   pr.id = opi.productId and pr.active = true and pr.deleted = false ";
	
	public static final String ORDER_DETAIL_WITH_PRODUCT_STORE_WISE = "select opi.id,opi.total,opi.status,pr.name,opi.poNumber from ( "+
			" select oi.id,oi.total,oi.status, op.productId ,oi.poNumber from orderItem oi Inner join orderProduct op on oi.id = op.orderId "+ 
			" where  oi.storeid= :storeId AND oi.deleted = false AND	oi.active = true and op.deleted = false AND op.active = true) opi,"+
			" product pr	where   pr.id = opi.productId and pr.active = true and pr.deleted = false ";
}
