SELECT location1
      ,location2
      ,count(1) AS used
      ,(SELECT location1_capacity*location2_capacity FROM settings) AS max_capacity
FROM glasses
WHERE ifnull(dispensed, 0) = 0
GROUP BY location1,location2
HAVING count(1) < (SELECT location1_capacity*location2_capacity FROM settings)
ORDER BY location1, location2
LIMIT 1;
--------------------------------

SELECT g.*,
       abs(g.od_sphere-ifnull(?, 0)) +
       abs(g.od_cylinder-ifnull(?, 0)) +
       abs(g.od_axis-ifnull(?, 0)) +
       abs(g.od_add-ifnull(?, 0)) +
       abs(g.os_sphere-ifnull(?, 0)) +
       abs(g.os_cylinder-ifnull(?, 0)) +
       abs(g.os_axis-ifnull(?, 0)) +
       abs(g.os_add-ifnull(?, 0)) vscore
FROM glasses g
LIMIT 100
---------------------------------------
INSERT INTO tolerance_tables VALUES (1,'REIMS');

INSERT INTO axis_tolerance VALUES (1, '-0.25', -15, 15);
INSERT INTO axis_tolerance VALUES (1, '-0.50', -15, 15);
INSERT INTO axis_tolerance VALUES (1, '-0.75', -12, 12);
INSERT INTO axis_tolerance VALUES (1, '-1.00', -12, 12);



SELECT *
FROM glasses
WHERE od_sphere BETWEEN -2.00-0.25 AND -2.00+0.25
AND od_cylinder BETWEEN -0.5-0.25 AND -0.5+0.25
AND od_axis BETWEEN 120-15 AND 120+15
AND od_add BETWEEN 2-0.25 AND 2+0.25

and os_sphere BETWEEN -2.25-0.25 AND -2.25+0.25
AND os_cylinder BETWEEN -0.75-0.25 AND -0.75+0.25
AND os_axis BETWEEN 60-15 AND 60+15
AND os_add BETWEEN 2-0.25 AND 2+0.25

SELECT *
FROM glasses
WHERE od_sphere BETWEEN -2.00-0.50 AND -2.00+0.50
AND od_cylinder BETWEEN -0.5-0.50 AND -0.5+0.50
AND od_axis BETWEEN 120-15-5 AND 120+15+3
AND od_add BETWEEN 2-0.50 AND 2+0.50

and os_sphere BETWEEN -2.25-0.50 AND -2.25+0.50
AND os_cylinder BETWEEN -0.75-0.50 AND -0.75+0.50
AND os_axis BETWEEN 60-15-3 AND 60+15+3
AND os_add BETWEEN 2-0.50 AND 2+0.50





-------------------------------------
SELECT 1,sku, od_sphere,od_cylinder,od_axis, od_add, os_sphere,os_cylinder,os_axis, os_add, 1 result_set
FROM glasses
WHERE od_sphere BETWEEN -2.00-0.25 AND -2.00+0.25
AND od_cylinder BETWEEN -0.5-0.25 AND -0.5+0.25
AND od_axis BETWEEN 120-15 AND 120+15
AND od_add BETWEEN 2-0.25 AND 2+0.25

AND os_sphere BETWEEN -2.25-0.25 AND -2.25+0.25
AND os_cylinder BETWEEN -0.75-0.25 AND -0.75+0.25
AND os_axis BETWEEN 60-15 AND 60+15
AND os_add BETWEEN 2-0.25 AND 2+0.25

UNION

SELECT 2,sku,od_sphere,od_cylinder,od_axis, od_add, os_sphere,os_cylinder,os_axis, os_add, 2 result_set
FROM glasses
WHERE od_sphere BETWEEN -2.00-0.50 AND -2.00+0.50
AND od_cylinder BETWEEN -0.5-0.50 AND -0.5+0.50
AND od_axis BETWEEN 120-15-3 AND 120+15+3
AND od_add BETWEEN 2-0.50 AND 2+0.50

and os_sphere BETWEEN -2.25-0.50 AND -2.25+0.50
AND os_cylinder BETWEEN -0.75-0.50 AND -0.75+0.50
AND os_axis BETWEEN 60-15-3 AND 60+15+3
AND os_add BETWEEN 2-0.50 AND 2+0.50

UNION


SELECT 3,sku,od_sphere,od_cylinder,od_axis, od_add, os_sphere,os_cylinder,os_axis, os_add, 3 result_set
FROM glasses
WHERE od_sphere BETWEEN -2.00-0.75 AND -2.00+0.75
AND od_cylinder BETWEEN -0.5-0.750 AND -0.5+0.750
AND od_axis BETWEEN 120-15-3 AND 120+15+3
AND od_add BETWEEN 2-0.750 AND 2+0.750

and os_sphere BETWEEN -2.25-0.750 AND -2.25+0.750
AND os_cylinder BETWEEN -0.75-0.750 AND -0.75+0.750
AND os_axis BETWEEN 60-15-3 AND 60+15+3
AND os_add BETWEEN 2-0.750 AND 2+0.750