SELECT glasses_id
     , '' || sku AS sku
     , od_sphere
     , od_cylinder
     , od_axis
     , od_add
     , os_sphere
     , os_cylinder
     , os_axis
     , os_add
    /* ,abs(od_sphere-(-2.00))
     ,abs(os_sphere-(-2.25)) , abs(od_cylinder-(-0.5)),abs(os_cylinder-(-0.75)), abs(od_axis-(120)), abs(os_axis-(60)), abs(od_add-(2)), abs(os_add-(2))*/
FROM [glasses]
WHERE
 od_sphere BETWEEN -2.00-0.5 AND -2.00+0.5
AND od_cylinder BETWEEN -0.5-0.5 AND -0.5+0.50
AND od_axis BETWEEN 120-15 AND 120+15
AND od_add >= 2

AND os_sphere BETWEEN -2.25-0.50 AND -2.25+0.50
AND os_cylinder BETWEEN -0.75-0.50 AND -0.75+0.50
AND os_axis BETWEEN 60-15 AND 60+15
AND os_add >= 2

ORDER BY abs(od_sphere-(-2.00))+abs(os_sphere-(-2.25))+abs(od_cylinder-(-0.5)) +abs(os_cylinder-(-0.75)) + abs(od_axis-(120))+ abs(os_axis-(60))+ abs(od_add-(2))+ abs(os_add-(2))




1.    OD  -3.00-1.50 X175  Add +1.50
      OS  -2.75-1.75 X010  Add +1.50

SELECT glasses_id
     , '' || sku AS sku
     , od_sphere
     , od_cylinder
     , od_axis
     , od_add
     , os_sphere
     , os_cylinder
     , os_axis
     , os_add
FROM [glasses]
WHERE
 od_sphere BETWEEN -3.00-0.5 AND -3.00+0.5
AND od_cylinder BETWEEN -1.5-0.5 AND -1.5+0.50
AND od_axis BETWEEN 175-15 AND 175+15
AND od_add >= 1.50

AND os_sphere BETWEEN -2.75-0.50 AND -2.75+0.50
AND os_cylinder BETWEEN -1.75-0.50 AND -1.75+0.50
AND os_axis BETWEEN 10-15 AND 10+15
AND os_add >= 2

ORDER BY abs(od_sphere-(-3.00))+abs(os_sphere-(-2.75))+abs(od_cylinder-(-1.50)) +abs(os_cylinder-(-1.75)) + abs(od_axis-(175))+ abs(os_axis-(10))+ abs(od_add-(1.50))+ abs(os_add-(1.50))


----------------------------------------------
SELECT
abs(od_sphere-(-2.00))/(SELECT abs(max(g1.od_sphere)-min(g1.od_sphere))+0.000000000000001 from glasses g1))+
abs(os_sphere-(-2.25))/(SELECT abs(max(g1.os_sphere)-min(g1.os_sphere))+0.000000000000001 from glasses g1))+
abs(od_cylinder-(-0.5))/(SELECT abs(max(g1.od_cylinder)-min(g1.od_cylinder))+0.000000000000001 from glasses g1))+
abs(os_cylinder-(-0.75))/(SELECT abs(max(g1.os_cylinder)-min(g1.os_cylinder))+0.000000000000001 from glasses g1))+
abs(od_axis-(120))+/(SELECT abs(max(g1.od_axis)-min(g1.od_axis))+0.000000000000001 from glasses g1))+
abs(os_axis-(60))/(SELECT abs(max(g1.os_axis)-min(g1.os_axis))+0.000000000000001 from glasses g1))+
abs(od_add-(2))/(SELECT abs(max(g1.od_add)-min(g1.od_add))+0.000000000000001 from glasses g1))+
abs(os_add-(2))/(SELECT abs(max(g1.os_add)-min(g1.os_add))+0.000000000000001 from glasses g1)) rnk,
 glasses_id
     , '' || sku AS sku
     , od_sphere
     , od_cylinder
     , od_axis
     , od_add
     , os_sphere
     , os_cylinder
     , os_axis
     , os_add
    /* ,abs(od_sphere-(-2.00))
     ,abs(os_sphere-(-2.25)) , abs(od_cylinder-(-0.5)),abs(os_cylinder-(-0.75)), abs(od_axis-(120)), abs(os_axis-(60)), abs(od_add-(2)), abs(os_add-(2))*/
FROM [glasses]
/*
WHERE
 od_sphere BETWEEN -2.00-0.5 AND -2.00+0.5
AND od_cylinder BETWEEN -0.5-0.5 AND -0.5+0.50
AND od_axis BETWEEN 120-15 AND 120+15
AND od_add >= 2

AND os_sphere BETWEEN -2.25-0.50 AND -2.25+0.50
AND os_cylinder BETWEEN -0.75-0.50 AND -0.75+0.50
AND os_axis BETWEEN 60-15 AND 60+15
AND os_add >= 2
*/
ORDER BY abs(od_sphere-(-2.00))+abs(os_sphere-(-2.25))+abs(od_cylinder-(-0.5)) +abs(os_cylinder-(-0.75)) + abs(od_axis-(120))+ abs(os_axis-(60))+ abs(od_add-(2))+ abs(os_add-(2))

