var el = x => document.getElementById(x);
$('#analyze-button').hide();
$('.result').hide();

function showPicker() {
  $('.result').hide();
  el("file-input").click();
}

function showPicked(input) {
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);

  $('#analyze-button').show();
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("please select a file to analyze!");

  el("analyze-button").innerHTML = "uploading and checking...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      console.log("got response from the server:" + e.target.responseText)
      var response = JSON.parse(e.target.responseText);
      $('.result').text('I see ' + response.result.replace('-', ' '));
      $('.result').show();
      $('#analyze-button').hide();
      el("analyze-button").innerHTML = "check for poles";
    }
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

