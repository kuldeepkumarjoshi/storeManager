package com.storeManager.entity;

import java.util.Date;


public class CommanEntity {

	private Long id;
	private Boolean deleted =Boolean.FALSE;
	private Boolean active = Boolean.TRUE;
	private String createdBy = "admin";
	private String lastModifiedBy = "admin";
	private Date createdDate  = new Date();
	private Date lastModifiedDate = new Date();
	
	public void setCommanEntity(Long id, Boolean active, Boolean deleted, String createBy, Date createdDate, String lastModifiedBy, Date lastModifiedDate){
		setId(id);
		setActive(active);
		setDeleted(deleted);
		setCreatedBy(createBy);
		setCreatedDate(createdDate);
		setLastModifiedBy(lastModifiedBy);
		setLastModifiedDate(lastModifiedDate);
	}
	
	public Boolean isActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getLastModifiedBy() {
		return lastModifiedBy;
	}
	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
	
}
