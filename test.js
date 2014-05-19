function runCode()
{
  
  var editor = document.getElementById('editor').value + "start_test();";
  var console = document.getElementById('console');
  console.innerHTML = "";
  eval(editor);
  
}

function clearTextAreas()
{

  var console = document.getElementById('console').innerHTML = "";
}