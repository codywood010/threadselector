$(document).ready(function(){
  $(window).resize(function(){
  $("#pages").css('min-height',window.innerHeight-200);
  
  });
});
function onDeviceReady() {
    alert("hi");
     ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
     ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
     ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
     ref.addEventListener('exit', function(event) { alert(event.type); });
}

function showStartPage() {
  html = "<div class='start-page-txt'>"
  html += "<p>Welcome to our Thread Selection App</p><br />"
  html += "<p>Here you will find an in-depth guide to choosing thread for specific applications.</p>";
  html += "<br /><center><a class='small_button' onclick='makeSelection()'>Let's Get Started!</a></center>";
  html += "</div>";
  
  $("#page").html(html);
  $("#pages").css('min-height',window.innerHeight-200);
}

function makeSelection(selection) {
  var num = 0;
  if (selection != null) num = selections.push(selection);

  var dataSlice = data;
  for (i=0;i<num;i++) {
    dataSlice = dataSlice[selections[i]];
  }
  
  if (typeof(dataSlice) == 'object' && (!(dataSlice instanceof Array))) {
    var options = [];
    for (key in dataSlice) {
      options.push(key);
    }
    display(options, false);
  }
  else {
    display(dataSlice, true);
  }
  $('#pages').css('min-height',window.innerHeight-200);
}

function startOver() {
  selections = [];
  makeSelection();
}

function goBack() {
  selections.pop();
  makeSelection(selections.pop());
}

function loadPage(url) {
    return window.open=(url, '_system');
}

function display(data, result) {
  var html = "";
  var first = (selections.length==0);
  
  if (!first) {
    html += "<div class='previous_selection'>Previous Selection:<br />"+selections[selections.length-1]+"</div>";
  }
  
  if (result) {
    html += "<div class='result'>" + data[0] + "</div>";
    html += "<div style='text-align: center;'><a href='#' class='small_button' onClick='loadPage(\""+data[1]+"\")'> Take Me There</a></div>";
  } else {
    for (i in data) {
      html += "<div class='button' onClick='makeSelection(this.innerHTML);'>" + data[i] + "</div>";
    }
  }
  
  if (result) {
    
  }
  
  $("#page").fadeOut('fast', function() {
    $(this).html(html);
    $('.back_buttons').toggle(!first);
    $("#page").fadeIn('fast');
  });
}
