/*
Create Table glasses
*/
DROP TABLE glasses;

CREATE TABLE glasses 
        (
            glasses_id integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
            sku INTEGER NOT NULL,

            type varchar(1) not null /*CHECK (type IN ('S','B'))*/,
            gender varchar(1) not null /*CHECK (gender IN ('M','F','U'))*/,
            size varchar(1) not null /* CHECK (gender IN ('C','S','M','L'))*/,
            tint varchar(1) not null /* CHECK (gender IN ('N','D','L'))*/,
            material varchar(1) /* CHECK (gender IN ('M','P'))*/,

            od_sphere REAL,
            od_cylinder REAL,
            od_axis REAL,
            od_add REAL,
            os_sphere REAL,
            os_cylinder REAL,
            os_axis REAL,
            os_add REAL,

            create_date TEXT,
            update_date TEXT,
            dispensed INTEGER DEFAULT 0 CHECK (dispensed IN (0,1)), /*whether the glasses has been dispensed or not, values permitted 1, 0*/
            deleted INTEGER DEFAULT 0 CHECK (dispensed IN (0,1))
        );
--------------------------------------
DROP TABLE settings;

CREATE TABLE settings
(
    location1_name varchar(30),
    location1_capacity INTEGER,
    location2_name varchar(30),
    location2_capacity INTEGER
);
-------------------------------------

DROP TABLE next_location;

CREATE TABLE next_location
(
    location1 INTEGER,
    location2 INTEGER,
    reserve_time TEXT
);


-------------------------------

CREATE TABLE searches
(
    eye VARCHAR(5),
    type VARCHAR(1),

    od_sphere REAL,
    od_cylinder REAL,
    od_axis REAL,
    od_add REAL,
    os_sphere REAL,
    os_cylinder REAL,
    os_axis REAL,
    os_add REAL,
    last_results_count INTEGER,
    create_date TEXT
)

---------------------
CREATE TABLE tolerance_tables
(
    table_id INTEGER,
    table_name TEXT
)

DROP TABLE axis_tolerance;

CREATE TABLE axis_tolerance
(
    tol_table_id INTEGER,
    cylinder TEXT,
    tol_min INT,
    tol_max INT
);
