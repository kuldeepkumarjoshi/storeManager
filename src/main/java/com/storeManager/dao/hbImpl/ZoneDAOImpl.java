package com.storeManager.dao.hbImpl;


import java.sql.ResultSet;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.storeManager.dao.ZoneDAO;
import com.storeManager.entity.Zone;


@Repository("zoneDAO")
public class ZoneDAOImpl extends AbstractDAOImpl<Zone> implements ZoneDAO {


	
}
