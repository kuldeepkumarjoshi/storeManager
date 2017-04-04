package com.storeManager.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.transaction.annotation.EnableTransactionManagement;
@EnableTransactionManagement
@Entity
@Table(name="stock")
public class Store {

	@Override
	public String toString() {
		return "Stock [id=" + id + ", Ticker=" + name + "]";
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="name")
	private int name;
	
	@Column(name="zoneId")
	private String zonId;
	
	@Column(name="contactId")
	private String contactId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getName() {
		return name;
	}

	public void setName(int name) {
		this.name = name;
	}

	public String getZonId() {
		return zonId;
	}

	public void setZonId(String zonId) {
		this.zonId = zonId;
	}

	public String getContactId() {
		return contactId;
	}

	public void setContactId(String contactId) {
		this.contactId = contactId;
	}
	
	

	
}
