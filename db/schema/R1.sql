 CREATE TABLE IF NOT EXISTS zone (
  id bigint NOT NULL,
  deleted char(1) DEFAULT false,
  active char(1) DEFAULT true,
  createdBy varchar(255) DEFAULT NULL,
  lastModifiedBy varchar(255) DEFAULT NULL,
  createdDate date DEFAULT NULL,
  lastModifiedDate date DEFAULT NULL,
  name varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);
CREATE INDEX INDZzoneName ON zone (name);

CREATE TABLE IF NOT EXISTS product (
  id bigint NOT NULL,
  deleted boolean DEFAULT false,
  active boolean DEFAULT true,
  createdBy varchar(255) DEFAULT NULL,
  lastModifiedBy varchar(255) DEFAULT NULL,
  createdDate date DEFAULT NULL,
  lastModifiedDate date DEFAULT NULL,
  name varchar(255) NOT NULL,
  description varchar(255) DEFAULT NULL,
  price double precision NOT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX INDPname ON product (name); 

CREATE TABLE IF NOT EXISTS store (
  id bigint NOT NULL,
  deleted boolean DEFAULT false,
  active boolean DEFAULT true,
  createdBy varchar(255) DEFAULT NULL,
  lastModifiedBy varchar(255) DEFAULT NULL,
  createdDate date DEFAULT NULL,
  lastModifiedDate date DEFAULT NULL,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  contactName varchar(255) NOT NULL UNIQUE,
  contactNumber1 varchar(255) NOT NULL,
  contactNumber2 varchar(255) DEFAULT NULL,
  contactNumber3 varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  mostRecentOrderDate date DEFAULT NULL,
  zoneId bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (zoneId) REFERENCES zone (id)
);
CREATE INDEX INDSstoreName ON store (name);
CREATE INDEX INDScontactNumber1 ON store (contactNumber1);
CREATE INDEX INDScontactName ON store (contactName);


CREATE TABLE IF NOT EXISTS orderitem (
  id bigint NOT NULL,
  deleted boolean DEFAULT false,
  active boolean DEFAULT true,
  createdBy varchar(255) DEFAULT NULL,
  lastModifiedBy varchar(255) DEFAULT NULL,
  createdDate date DEFAULT NULL,
  lastModifiedDate date DEFAULT NULL,
  title varchar(255) NOT NULL,
  storeId bigint NOT NULL,
  total double precision NOT NULL,
  subTotal double precision NOT NULL,
  status varchar(255) NOT NULL,
  poNumber varchar(255) DEFAULT NULL,
  orderDate date DEFAULT NULL,
  remarks varchar(255) DEFAULT NULL,
  poReceivedOnEmail boolean DEFAULT NULL,
  orderReceivedNotification boolean NOT NULL,
  orderDeliveredNotification boolean NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (storeId) REFERENCES store (id)
);
CREATE INDEX INDOIorderDate ON orderitem (orderDate);
CREATE INDEX INDOIstatus ON orderitem (status);
CREATE INDEX INDOIstoreId ON orderitem (storeId);

CREATE TABLE IF NOT EXISTS orderproduct (
  id bigint NOT NULL,
  deleted boolean DEFAULT false,
  active boolean DEFAULT true,
  createdBy varchar(255) DEFAULT NULL,
  lastModifiedBy varchar(255) DEFAULT NULL,
  createdDate date DEFAULT NULL,
  lastModifiedDate date DEFAULT NULL,
  orderId bigint NOT NULL,
  productId bigint NOT NULL,
  quantity int NOT NULL,
  price double precision NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (orderId) REFERENCES orderitem (id),
  FOREIGN KEY (productId) REFERENCES product (id)
);
CREATE INDEX INDOPproductId ON orderproduct (productId);
CREATE INDEX INDOPorderId ON orderproduct (orderId);