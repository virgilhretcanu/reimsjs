function raiseError(obj,message)
{
   obj.addClass("value_error").attr("title", message);
   obj.effect("pulsate", { times:3 }, 800);
}

function resetError(obj)
{
   obj.removeClass("value_error").attr("title",""); 
}