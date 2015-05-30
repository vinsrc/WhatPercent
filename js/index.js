$(document).ready(function()
{  
 $('input').attr('maxlength',15);
 $('input').keyup(calculate);
});

var precision=3;
var functors = {};

functors.VALUE = function(x,y) 
{
  x = x || 0
  y = y || 0
  return (y * (x / 100)).toFixed(precision);
};

functors.PERCENT = function(x,y) 
{
  x = x || 0
  y = y || 0
  return ((x / y) * 100).toFixed(precision) +"%";
};

functors.DISCOUNT = function(x,y) 
{
  x = x || 0 
  y = y || 0
  return (x - (y * (x / 100))).toFixed(precision) ;
};

functors.INCREMENT = function(x,y) 
{
  x = x || 0
  y = y || 0
  return x + (y * (x / 100));
};

functors.CHANGE = function(x,y) 
{
  x = x || 0
  y = y || 0
  var z = ((y - x) * 100) / x;  
  if(z > 0) { return "an increase of " + z.toFixed(precision)  +"%";}
  if(z < 0) { return "a decrease of " + (z * -1).toFixed(precision)  +"%";}
};

function calculate()
{
  var statement = $(this).parent();
  var statementType = statement.data("operator");
  var x = parseFloat(statement.children('input:nth-child(1)').val());
  var y = parseFloat(statement.children('input:nth-child(2)').val());
  var result = functors[statementType](x,y);
  statement.children('span').text(result);
}