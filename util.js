exports.formatDate= function(d)
{
 var curr_date = d.getDate();
 var curr_month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
 var curr_year = d.getFullYear();
 var curr_hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
 var curr_minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
 var curr_seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
 return curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hour + ":" + curr_minutes + ":" + curr_seconds;
}

/*
Returns a data string in a user friendly format, MM/DD/YY HH:MM:SS
d - date string in YYYY-MM-DD HH:MM:SS format
t - include time, true or false
*/
exports.formatDateToScreen = function(d, t)
{
    var return_date;
    var d1 = d.split(" ")[0];
    var year = d1.split("-")[0];
    var month = d1.split("-")[1];
    var day = d1.split("-")[2];
        
    return_date = month +"/" + day + "/" + year;
    if(t)
    {
        var d2 = d.split(" ")[1];
        return_date = return_date + " " + d2;
    }
    return return_date;
}

exports.REIMS_Axis_Tolerance = function(cylinder)
{
    if(cylinder == 0 || cylinder == -0.25 || cylinder == -0.5)
    {
        return 15;
    }
    if(cylinder == -0.75 || cylinder == -1.00)
    {
        return 12;
    }
    if(cylinder == -1.25 || cylinder == -1.50)
    {
        return 8;
    }
    if(cylinder == -1.55 || cylinder == -2.00)
    {
        return 5;
    }

    return 3;
}