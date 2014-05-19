/** 
 * This JS program defines several print functions, including: printf, 
 * prints, and printe. The most significant of these is printf. printf
 * 
 */

/** 
 * this is where the magic happens
 * @const 
 * @type {Regexp}
 */
var PLACEHOLDERS = 
/%(?:([\+\- 0#])?(?:(?!\1)([\+\- 0#]))?(?:(?!\1|\2)([\+\- 0#]))?(?:(?!\1|\2|\3)([\+\- 0#]))?)(\[.*\])?(\d+|\*)?(\.(\d+|\*)?)?([hljztL]|(?:hh)|(?:ll))?([abcdefgionsuvxABCDEFGOSTVWX\$])/m;


var CODE_HS_CONSOLE = 
"html body.editorbody div#wrapper.editor-wrap div#right div#tab-bar.tabbable div.tab-content.editor-tab-content div#run-tab.tab-pane.active div#output div#console";

//This must be commented out on codeHS because \n will crash the webpage
/** 
 * @const 
 */
var REPLACE_ALL =
  [
    {pattern:/(?:\r\n?)|(?:\n\r?)/g, value:'</br>'},
    {pattern:/\t/g, value:"    "}, 
    {pattern:/[ ]/g, value:'&nbsp;'},
    {pattern:/%%/g, value:'%'}

  ];

/** 
 * @const 
 */
var CODEHS_REPLACE_ALL =
  [
    {pattern:/[/][/]/g, value:'zxcvbnm'},//random gibberish
    {pattern:/(?:[/]r(?:[/]n)?)|(?:[/]n(?:[/]r)?)/g, value:'<br>'},
    {pattern:/[/]t/g, value:"    "}, 
    {pattern:/[/]qq/g, value:'"'},
    {pattern:/[/]q/g, value:"'"},
    {pattern:/[/]bs/g, value:String.fromCharCode(0x5C)},
    {pattern:/.[/]b/g, value:""},
    {pattern:/zxcvbnm/g, value:'/'},//random gibberish
    {pattern:/[ ]/g, value:'&nbsp;'},
    {pattern:/<br>/g, value:'</br>'},
    {pattern:/%%/g, value:'%'}

  ];



/**
 * Creates an instance of FormatError.
 *
 * @constructor
 * @this {FormatError}
 * @param {string} name The name of this error.
 * @param {string} message The message to be displayed.
 */
function FormatError(message) 
{
  this.name = "Format Error: ";
  this.message = message || "Format String Parse Error";
}



/***
 *                     _           _   
 *                    (_)         | |  
 *      _ __    _ __   _   _ __   | |_ 
 *     | '_ \  | '__| | | | '_ \  | __|
 *     | |_) | | |    | | | | | | | |_ 
 *     | .__/  |_|    |_| |_| |_|  \__|
 *     | |                             
 *     |_|                             
 */
/**
 * Prints a string to the console in pure ascii.
 *
 * @param {string} arg message The message to be displayed.
 */
function print(arg)
{
  document.getElementById("console").innerHTML += arg;
}



/***
 *                     _           _     _         
 *                    (_)         | |   | |        
 *      _ __    _ __   _   _ __   | |_  | |  _ __  
 *     | '_ \  | '__| | | | '_ \  | __| | | | '_ \ 
 *     | |_) | | |    | | | | | | | |_  | | | | | |
 *     | .__/  |_|    |_| |_| |_|  \__| |_| |_| |_|
 *     | |                                         
 *     |_|                                         
 */
/**
 * This is simply print with an extra '\n' added to the end.
 *
 * @param {string} arg message The message to be displayed.
 */
function println(arg)
{
  print(arg + "\n");
}



/***
 *                     _           _      __ 
 *                    (_)         | |    / _|
 *      _ __    _ __   _   _ __   | |_  | |_ 
 *     | '_ \  | '__| | | | '_ \  | __| |  _|
 *     | |_) | | |    | | | | | | | |_  | |  
 *     | .__/  |_|    |_| |_| |_|  \__| |_|  
 *     | |                                   
 *     |_|                                   
 */
/**
 * Prints arguments in much the same way as printf in c/c++.
 *
 * @param {string} format Format String.
 * @param {...?} var_args message The message to be displayed.
 */
function printf()
{
  var arg = [];

  for(var i = 0; i < arguments.length; i++)
  {
    arg.push(arguments[i]);
  }
  print(vprintf(arg));
  
  return 0;
}




/***
 *                           _           _      __ 
 *                          (_)         | |    / _|
 *      ___   _ __    _ __   _   _ __   | |_  | |_ 
 *     / __| | '_ \  | '__| | | | '_ \  | __| |  _|
 *     \__ \ | |_) | | |    | | | | | | | |_  | |  
 *     |___/ | .__/  |_|    |_| |_| |_|  \__| |_|  
 *           | |                                   
 *           |_|                                   
 */
/**
 * Prints arguments in much the same way as sprintf in c/c++.
 *
 * @param {string} format Format String.
 * @param {...?} var_args message The message to be displayed.
 * @return {string} fString String reflecting requested formatting.
 */
function sprintf()
{
  var arg = [];
  for(var i = 0; i < arguments.length; i++)
  {
    arg.push(arguments[i]);
  }
  return vprintf(arg);
}




/***
 *                            _           _      __ 
 *                           (_)         | |    / _|
 *       ___   _ __    _ __   _   _ __   | |_  | |_ 
 *      / _ \ | '_ \  | '__| | | | '_ \  | __| |  _|
 *     |  __/ | |_) | | |    | | | | | | | |_  | |  
 *      \___| | .__/  |_|    |_| |_| |_|  \__| |_|  
 *            | |                                   
 *            |_|                                   
 */
/**
 * Prints arguments in much the same way as sprintf in c/c++.
 *
 * @param {Element} element The element to which eprintf is writing.
 * @param {string} format Format String.
 * @param {...?} var_args message The message to be displayed.
 * @return {string} fString String reflecting requested formatting.
 */
function eprintf()
{
  var arg = [];
  var element = arguments[0];
  var fString;
  for(var i = 1; i < arguments.length; i++)
  {
    arg.push(arguments[i]);
  }
  
  fString = vprintf(arg);
  fString = processEscapeSequences(fString, REPLACE_ALL);
  element.innerHTML += arg;
}




/***
 *      _                            _           _      __ 
 *     | |                          (_)         | |    / _|
 *     | |__    ___   _ __    _ __   _   _ __   | |_  | |_ 
 *     | '_ \  / __| | '_ \  | '__| | | | '_ \  | __| |  _|
 *     | | | | \__ \ | |_) | | |    | | | | | | | |_  | |  
 *     |_| |_| |___/ | .__/  |_|    |_| |_| |_|  \__| |_|  
 *                   | |                                   
 *                   |_|                                   
 */
/**
 * A variant of printf which prints to the console in the CodeHS sandbox.
 * This function adapts the / character to act as an escape sequence, because
 * using \n or \t breaks the CodeHS command line. so, \n->/n etc...
 *
 * @param {string} format Format String.
 * @param {...?} var_args message The message to be displayed.
 * @return {string} fString String reflecting requested formatting.
 */
function hsprintf()
{
  var arg = [];
  var element = arguments[0];
  var fString;
  for(var i = 1; i < arguments.length; i++)
  {
    arg.push(arguments[i]);
  }
  
  fString = vprintf(arg);
  fString = processEscapeSequences(fString, CODEHS_REPLACE_ALL);
  
  /*this must be replaced with a reference to the console element*/
  document.getElementById(CODE_HS_CONSOLE).innerHTML += fString;
}




/***
 *                             _           _      __ 
 *                            (_)         | |    / _|
 *     __   __  _ __    _ __   _   _ __   | |_  | |_ 
 *     \ \ / / | '_ \  | '__| | | | '_ \  | __| |  _|
 *      \ V /  | |_) | | |    | | | | | | | |_  | |  
 *       \_/   | .__/  |_|    |_| |_| |_|  \__| |_|  
 *             | |                                   
 *             |_|                                   
 */
/**
 * Prints arguments in much the same way as vprintf in c/c++.
 *
 * @param {string} format Format String.
 * @param {...?} var_args message The message to be displayed.
 * @return {string} fString String reflecting requested formatting.
 */
function vprintf(args)
{

  var fString = args[0];

  var inputs = [];
  for(var i = 1; i < args.length; i++)
  {
    inputs.push(args[i]);
  }

  var match = PLACEHOLDERS.exec(fString);
  

  
  while(match != null)
  {

    var rightJustify = true;
    var showPlus = false;
    var verbose = false;
    var padchar = ' ';
    var special = [];
    
    var width = 0;
    var precision = "undefined";
    var specifier = "";
    var modifiers = "";
    
    var format = match[0];

    var flags = /%([\+\- 0#])?([\+\- 0#])?([\+\- 0#])?([\+\- 0#])?/.exec(format);
    rightJustify = flags[0].toString().indexOf("-")==-1;
    verbose = flags[0].toString().indexOf('#') !=-1;
    showPlus = flags[0].toString().indexOf('+') !=-1;
    
    
    padchar = flags[0].indexOf('0') != -1 && rightJustify ? '0' : ' ';
    
    format = format.substring(flags[0].length,format.length);
    special = /\[(.*)\]/.exec(format);
    
    if(special != null)
    {
      format = format.substring(special[0].length, format.length);
      special = special[1];
    }
    
    if(format[0] == '*')
    {
      width = parseInt(inputs.shift().toString());
      format = format.substring(1);
    }
    else if(/\d/.exec(format[0])==null)
    {
      width = 0;
    }
    else
    {
      width = parseInt(format.toString());
      format = format.substring(width.toString());
    }

    
    if(format[0]=='.')
    {

      format = format.substring(1);
      if(format[0]=='*')
      {
        format = format.substring(1);
        precision = parseInt(inputs.shift().toString());
      }
      else
      {
        
        precision = parseInt(format.toString());
        format = format.replace(precision,"");
      }
    }
    specifier = match[0][match[0].length-1];
    modifiers = /([hljztl]|(?:hh)|(?:ll))/.exec(match[0]);
    modifiers = modifiers == null ? "" : modifiers[0];

    var formatted = inputs.shift();
    if(specifier == 'n')
    {
      formatted[0] = fString.indexOf(match[0]);
    }
    else if(/[diuoxX]/.exec(specifier) != null)
    {
      formatted = formatInt(formatted, specifier, verbose, showPlus);
    }
    else if(/[afegAFEG\$]/.exec(specifier) != null)
    {
      formatted = formatFloat(formatted, special, specifier, precision, showPlus);
    }
    else if(/[cC]/.exec(specifier) != null)
    {
      formatted = formatChar(formatted, specifier);
      if(modifiers == 'h')
      {
        formatted = formatted.toLowerCase();
      }
    }
    else if(/[sSbB]/.exec(specifier) != null)
    {
      
      if(precision == "undefined" || formatted.toString().length < precision)
      {
        precision = formatted.toString().length;
      }
      else if(precision < 1)
      {
        precision = 1;
      }
      formatted = formatted.toString().substring(0, precision);
      
      if(/[bB]/.exec(specifier) != null)
      {
        formatted = new Boolean(formatted).toString().substring(0, precision).valueOf();
        if(formatted = false)
        {
          //switch()
        }
      }
      
      if(modifiers == 't')
      {
        formatted = formatted.trim();
      }
    }
    else if(/[vV]/.exec(specifier) != null)
    {
      
      if(special == '@')
      {
        special = formatted;
        formatted = inputs.shift();
      }
      formatted = formatted.join(special != null ? special : ", ");
    }
    else if(specifier == 'D')
    {
      formatted = formatDate(special, new Date(formatted), modifiers);
    }
    else if(specifier == 'O')
    {
      formatted = formatted.objectPrintf(rightJustify, showPlus, verbose, padchar, special, width, precision, specifier);
    }
    else if(specifier == 'T')
    {
      formatted = typeof(formatted);
    }
    else if(specifer == 'W')
    {
      formatted = "<span style=\"" + specifier + "\">" + formatted + "</span>";
    }
    
    if(/[A-CE-NP-SU-Z]/.exec(specifier) != null)
    {
      formatted = formatted.toString().toUpperCase();
    }
    formatted = addPadding(formatted, width, padchar, rightJustify);
    
    fString = fString.replace(match[0], formatted);
    
    match = PLACEHOLDERS.exec(fString);

  }
  
  return fString;
}



//*****************************************************************************************
/***
 *      _    _          _                             
 *     | |  | |        | |                            
 *     | |__| |   ___  | |  _ __     ___   _ __   ___ 
 *     |  __  |  / _ \ | | | '_ \   / _ \ | '__| / __|
 *     | |  | | |  __/ | | | |_) | |  __/ | |    \__ \
 *     |_|  |_|  \___| |_| | .__/   \___| |_|    |___/
 *                         | |                        
 *                         |_|                        
 */
 
function formatStyling(formatted, special, specifier, precision, showPlus)
{
  
}
 
function formatChar(formatted, specifier)
{
  if(!isNaN(formatted))
  {
    formatted = String.fromCharCode(formatted%Math.pow(2,16));
  }
  else if(isCharLit(formatted))
  {
    formatted = formatted[0];
  }
  else 
  {
    throw new FormatError(formatted + ": Is not a Char");
  }
  return formatted;
}

function formatFloat(formatted, special, specifier, precision, showPlus)
{
  if(precision == "undefined")
  {
    precision = specifier == '$' ? 2 : 6;

  }
  
  var specifierCopy = specifier;
  specifier = specifier == 'a' ? 'e' : specifier;
  specifier = specifier == 'A' ? 'E' : specifier;
  
  
  var f = parseFloat(formatted.toString()).toFixed(precision);
  var e = parseFloat(formatted.toString()).toExponential(precision);

  if(/[gG]/.exec(specifier))
  {
    formatted = e.toString().length < f.toString.length ? e : f;
  }
  formatted = /[eE]/.exec(specifier) ? e : f;
  if(formatted==e)
  {
    var exponent = /e[\+\-]\d*$/.exec(e)[0].toString();
    var sign = exponent[1];
    exponent = exponent.substring(2);

    while(exponent.toString().length < 3)
    {
      exponent = '0'+exponent;
    }
    formatted = formatted.toString().replace(/e[\+\-]\d*$/,"e"+sign+exponent);
  }
  
  if(/[aA]/.exec(specifierCopy) != null)
  {
    
    var a = parseInt(parseFloat(formatted).toString());
    var b = parseInt(parseFloat(formatted.replace(/\d*\./.exec(formatted),"").toString()));
    formatted = formatted.replace(/\d*\.\d*e/, "0x" + a.toString(16)+'.'+b.toString(16)+'p');

    
  }
  
  if(showPlus && formatted[0] != '-')
  {
    formatted = '+' + formatted;
  }
  
  if(specifier == '$')
  {
    var symbol = special == null || special.length == 0 ? '$' : special;
    if(formatted[0] == '-' || formatted[0] == '+')
    {
      formatted = formatted[0] + symbol + formatted.substring(1);
    }
    else
    {
      formatted = symbol + formatted;
    }
  }
  
  return formatted;
}

function formatInt(formatted, specifier, verbose, showPlus)
{
  var base;

  if(/[diu]/.exec(specifier) != null)
  {
    base = 10;
  }
  else if(/[o]/.exec(specifier) != null)
  {
    base = 8;
  }
  else if(/[xX]/.exec(specifier) != null)
  {
    base = 16;
  }

  formatted = parseInt(formatted.toString());
  if(/[di]/.exec(specifier) == null)
  {
    //this is wrong but will work for now
    formatted = Math.abs(formatted);
  }
  formatted = formatted.toString(base);
  
  
  if(base !=10 && formatted != '0' && verbose)
  {
    var isNegative = formatted[0]=='-';
    if(/[xX]/.exec(specifier) != null)
    {
      formatted = '0x' + formatted;
    }
    else
    {
      formatted = '0' + formatted;
    }
    if(isNegative)
    {
      formatted = '-' + formatted;
    }
  }
  if(showPlus && formatted[0] != '-')
  {
    formatted = '+' + formatted;
  }
  return formatted;
}

function formatDate(special, formatted, modifiers)
{
  if(special != null)
  {
    var dFormat = special;
    
    dFormat = fF(dFormat, formatted);

    dFormat = fM(dFormat, formatted);

    dFormat = fY(dFormat, formatted);

    dFormat = fH(dFormat, formatted);

    dFormat = fD(dFormat, formatted);

    dFormat = fS(dFormat, formatted);

    dFormat = fTxt(dFormat, formatted);
    
    formatted = dFormat;
  }
  else if(modifiers == "hh")
  {
    formatted = formatted.toDateString();
  }
  else if(modifiers == "h")
  {
    formatted = formatted.toTimeString();
  }
  else if(modifiers == "l")
  {
    formatted = formatted.toLocaleTimeString();
  }
  else if(modifiers == "ll")
  {
    formatted = formatted.toLocaleDateString();
  }
  else if(modifiers == "j")
  {
    formatted = formatted.toJSON();
  }
  else if(modifiers == "z")
  {
    formatted = formatted.toISO();
  }
  else if(modifiers == "t")
  {
    formatted = formatted.toUTCString();
  }
  else if(modifiers == "L")
  {
    formatted = formatted.toLocaleString();
  }
  else
  {
    formatted = formatted.toString();
  }
  
  return formatted;
}



function fTxt(dFormat, formatted)
{
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var monthNames = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
  
  var period = formatted.getYear() > 0 ? "A.D." : "B.C.";
  var half = formatted.getHours() > 11 ? "AM" : "PM";
  
  var day = dayNames[formatted.getDay()];
  var month = monthNames[formatted.getMonth()];

  dFormat = dFormat.replace(/tt/g, half);
  dFormat = dFormat.replace(/t/g, half[0]);

  dFormat = dFormat.replace(/\*MMMM\*/g, month);
  dFormat = dFormat.replace(/\*MMM\*/g, month.substring(0,3));
  
  dFormat = dFormat.replace(/\*dddd\*/g, day);
  dFormat = dFormat.replace(/\*ddd\*/g, day.substring(0,3));
  
  dFormat = fZ(dFormat, formatted);
  
  dFormat.replace(/gg?/g, period);
  
  return dFormat;
}



function fZ(dFormat, formatted)
{
  var offset = formatted.getTimezoneOffset()*-1;
  
  var offsetHours = Math.floor(offset/60);
  
  var offsetLong = (offsetHours.toString()[0] == '-' ? '-' : '+') + (Math.abs(offsetHours) < 10 ? "0" : "") + Math.abs(offsetHours);
  var offsetTotal = offsetLong + (100 + Math.abs(offset%60)).toString().substring(1);
  dFormat = dFormat.replace(/zzz/g, "GMT" + offsetTotal + " " + /\(.*\)/.exec(formatted.toString())[0]);
  dFormat = dFormat.replace(/zz/g, offset == 0 ? "GMT" : "GMT" + offsetTotal);
  dFormat = dFormat.replace(/z/g, offset == 0 ? 'Z' : "GMT" + offsetTotal);
  

  return dFormat;
}

function fM(dFormat, formatted)
{

  var minutes = formatted.getMinutes();
  var month = formatted.getMonth()+1;
  
  dFormat = dFormat.replace(/mm/g, (minutes < 10 ? "0" : "") + minutes);
  dFormat = dFormat.replace(/m/g, minutes);
  
  dFormat = dFormat.replace(/MMMM/g, "PPPP");
  dFormat = dFormat.replace(/MMM/g, "PPP");
  dFormat = dFormat.replace(/MM/g, (month < 10 ? "0" : "") + month);
  dFormat = dFormat.replace(/M/g, month);
  
  
  dFormat = dFormat.replace(/PPPP/g, "*MMMM*");
  dFormat = dFormat.replace(/PPP/g, "*MMM*");
  return dFormat;
}

function fD(dFormat, formatted)
{
  var date = formatted.getDate();
  
  dFormat = dFormat.replace(/dddd/g, "pppp");
  dFormat = dFormat.replace(/ddd/g, "ppp");
  dFormat = dFormat.replace(/dd/g, (formatted < 10 ? "0" : "") + date);
  dFormat = dFormat.replace(/d/g, date);
  
  dFormat = dFormat.replace(/pppp/g, "*dddd*");
  dFormat = dFormat.replace(/ppp/g, "*ddd*");
  
  return dFormat;
}



function fF(dFormat, formatted)
{
  var secFraction = formatted.getMilliseconds().toString();
  
  dFormat = dFormat.replace(/FFF/g, secFraction);
  dFormat = dFormat.replace(/FF/g, secFraction.substring(0,2));
  dFormat = dFormat.replace(/F/g, secFraction[0]);

  while(secFraction.length<3)
  {
    secFraction += '0';
  }

  dFormat = dFormat.replace(/fff/g, secFraction);
  dFormat = dFormat.replace(/ff/g, secFraction.substring(0,2));
  dFormat = dFormat.replace(/f/g, secFraction[0]);
  
  return dFormat;
}



function fY(dFormat, formatted)
{
  var year = formatted.getFullYear().toString();
  
  while(year.length<5)
  {
    year = '0' + year;
  }

  dFormat = dFormat.replace(/yyyyy/g, year);
  if(year[0] == '0')
  {
    year = year.substring(1, year.length);
  }
  dFormat = dFormat.replace(/yyyy/g, year.substring(0,4));
  if(year[0] == '0')
  {
    year = year.substring(1, year.length);
  }

  dFormat = dFormat.replace(/yyy/g, year.substring(0,3));
  if(year[0] == '0')
  {
    year = year.substring(1, year.length);
  }
  
  year = year.substring(year.length-2, year.length);
  
  dFormat = dFormat.replace(/yy/g, parseInt(year));
  if(year[0] == '0')
  {
    year = year.substring(1, year.length);
  }
  dFormat = dFormat.replace(/y/g, year);
  
  return dFormat;
}

function fH(dFormat, formatted)
{
  var hour = formatted.getHours();
  dFormat = dFormat.replace(/HH/g, (hour < 10 ? "0" : "") + hour);
  dFormat = dFormat.replace(/H/g, hour);

  hour = 12%hour;
  if(hour == 0)
  {
    hour = 12;
  }
  dFormat = dFormat.replace(/hh/g, (hour < 10 ? "0" : "") + hour);
  dFormat = dFormat.replace(/h/g, hour);
  return dFormat;
}

function fS(dFormat, formatted)
{
  var seconds = formatted.getSeconds();
  dFormat = dFormat.replace(/ss/g, (seconds < 10 ? "0" : "") + seconds);
  dFormat = dFormat.replace(/s/g, seconds);

  return dFormat;
}

function processEscapeSequences(fString, replacements)
{
  
  for(var i = 0; i < replacements.length; i++)
  {
    fString = fString.replace(replacements[i].pattern,replacements[i].value);
  }
  return fString;
}

function addPadding(formatted, width, padchar, rightJustify)
{
  var pad = "";

  for(var i = formatted.length; i < width; i++)
  {
    pad += padchar;
  }
  var formatted = rightJustify ? (pad+formatted) : (formatted+pad);

  return formatted;
}


function isString(arg)
{
  var stringType = typeof("String");
  return typeof(arg) == stringType || typeof(arg.valueOf()) == stringType;
}

function isCharLit(arg)
{
  return isString(arg) && arg.length == 1;
}