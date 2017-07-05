--- zone insertion
INSERT INTO zone (id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name) VALUES
(1001, false, true, 'admin', 'admin', '2017-04-05', '2017-04-13', 'Ahmedabad');
INSERT INTO zone (id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name) VALUES
(1002, false, true, 'admin', 'admin', '2017-04-05', '2017-04-13', 'Vodadra');
INSERT INTO zone (id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name) VALUES
(1003, false, true, 'admin', 'admin', '2017-04-05', '2017-04-13', 'Surat');
INSERT INTO zone (id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name) VALUES
(1004, false, true, 'admin', 'admin', '2017-04-05', '2017-04-13', 'Anant');
INSERT INTO zone (id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name) VALUES
(1005, false, true, 'admin', 'admin', '2017-04-05', '2017-04-13', 'Jharkhand');
INSERT INTO zone (id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name) VALUES
(1006, false, true, 'admin', 'admin', '2017-04-05', '2017-04-13', 'Madhya Pradesh'); 

--store insertion 
INSERT INTO store 
(id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name, address, contactName, contactNumber1, contactNumber2, contactNumber3, email, mostRecentOrderDate, zoneId) VALUES
(101, false, true, 'admin', 'admin',            '2017-04-05', '2017-04-13', 'Makarpura', 'mandal bhilwara','ankit',  '9413640488', '9413650466', NULL, 'kkuldeepjoshi5@gmail.com', '2017-04-12', 1002);
INSERT INTO store 
(id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name, address, contactName, contactNumber1, contactNumber2, contactNumber3, email, mostRecentOrderDate, zoneId) VALUES
(102, false, true, 'admin', 'admin',            '2017-04-05', '2017-04-13', 'akota', 'jaipur jaipur','aayush',  '9413540488', '9415847488', NULL, 'aayushkhandpur@gmail.com', '2017-04-12', 1002);
INSERT INTO store 
(id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name, address, contactName, contactNumber1, contactNumber2, contactNumber3, email, mostRecentOrderDate, zoneId) VALUES
(103, false, true, 'admin', 'admin',            '2017-04-05', '2017-04-13', 'Varsa', 'mandal bhilwara','kuldeep',  '9418740488', '9413650466', NULL, 'kkuldeepjoshi5@gmail.com', '2017-04-12', 1002);
INSERT INTO store 
(id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name, address, contactName, contactNumber1, contactNumber2, contactNumber3, email, mostRecentOrderDate, zoneId) VALUES
(104, false, true, 'admin', 'admin',            '2017-04-05', '2017-04-13', 'Sardar Nagar', 'mandal bhilwara','gaurav',  '9413890488', '9413650466', NULL, 'kkuldeepjoshi5@gmail.com', '2017-04-12', 1002);
INSERT INTO store 
(id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name, address, contactName, contactNumber1, contactNumber2, contactNumber3, email, mostRecentOrderDate, zoneId) VALUES
(105, false, true, 'admin', 'admin',            '2017-04-05', '2017-04-13', 'Makarpura', 'mandal bhilwara','karan',  '9413645288', '9413650466', NULL, 'kkuldeepjoshi5@gmail.com', '2017-04-12', 1002);
INSERT INTO store 
(id, deleted, active, createdBy, lastModifiedBy, createdDate, lastModifiedDate, name, address, contactName, contactNumber1, contactNumber2, contactNumber3, email, mostRecentOrderDate, zoneId) VALUES
(106, false, true, 'admin', 'admin',            '2017-04-05', '2017-04-13', 'Makarpura', 'mandal bhilwara','akash',  '9413612488', '9413650466', NULL, 'kkuldeepjoshi5@gmail.com', '2017-04-12', 1002);

--product insertion
INSERT INTO public.product
(id, deleted, active, createdby, lastmodifiedby, createddate, lastmodifieddate, name, description, price)	VALUES 
(10001, false, true, 'admin' , 'admin',          '12/10/2015', '10/4/2016',   'p.mogia', 'p.mogia', 18);
INSERT INTO public.product
(id, deleted, active, createdby, lastmodifiedby, createddate, lastmodifieddate, name, description, price)	VALUES 
(10002, false, true, 'admin' , 'admin',          '12/10/2015', '10/4/2016',   'p.pandade', 'p.pandade', 18);
INSERT INTO public.product
(id, deleted, active, createdby, lastmodifiedby, createddate, lastmodifieddate, name, description, price)	VALUES 
(10003, false, true, 'admin' , 'admin',          '12/10/2015', '10/4/2016',   'p.gold', 'p.gold', 90);
INSERT INTO public.product
(id, deleted, active, createdby, lastmodifiedby, createddate, lastmodifieddate, name, description, price)	VALUES 
(10004, false, true, 'admin' , 'admin',          '12/10/2015', '10/4/2016',   'S.sug', 'S.sug', 30);
INSERT INTO public.product
(id, deleted, active, createdby, lastmodifiedby, createddate, lastmodifieddate, name, description, price)	VALUES 
(10005, false, true, 'admin' , 'admin',          '12/10/2015', '10/4/2016',   'CW.50', 'CW.50', 5);
INSERT INTO public.product
(id, deleted, active, createdby, lastmodifiedby, createddate, lastmodifieddate, name, description, price)	VALUES 
(10006, false, true, 'admin' , 'admin',          '12/10/2015', '10/4/2016',   'CW.100', 'CW.100', 6);