function raiseError(obj,message)
{
   obj.addClass("value_error").attr("title", message);
   obj.effect("pulsate", { times:3 }, 800);
}

function resetError(obj)
{
   obj.removeClass("value_error").attr("title","");
}

/*
Returns a data string in a user friendly format, MM/DD/YY HH:MM:SS
d - date string in YYYY-MM-DD HH:MM:SS format
t - include time, true or false
*/
function formatDateToScreen(d, t)
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
