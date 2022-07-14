// inspired by curl2scrapy https://github.com/michael-shub/curl2scrapy

var urlField = $('#url');
var jsonField = $('#json');
var urlLink = $('#url-link a');
var btn = $('#btn');
var excludeKeys = []

function url2json(urlText) {
  try {
    queryString = urlText.split('?')[1]
    const urlParams = new URLSearchParams(queryString)

    const entries = urlParams.entries();
    var obj = {};
    for (const entry of entries) {
      if (entry[0] == 'url') {
        urlLink.text(entry[1]);
        urlLink.attr('href', entry[1]);
      }
      if (excludeKeys.includes(entry[0])) { continue; }
      obj[entry[0]] = entry[1];
    }
    jsonField.val(JSON.stringify(obj, null, 4));
  }
  catch (e) {
    jsonField.val('Something went wrong...' + '\n' + e);
  }
};

// Translate on paste function + callback
// Many thanks to https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
function handlePaste(e) {
  var clipboardData, pastedData;

  // Get pasted data via clipboard API
  clipboardData = e.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData('Text');

  // Do whatever with pasteddata
  url2json(pastedData);
}
document.getElementById('url').addEventListener('paste', handlePaste);

// // Ctrl-Enter pressed
urlField.keydown(function (e) {
  if (e.ctrlKey && e.keyCode == 13) {
    url2json(urlField.val());
  }
});

// Button click
btn.click(function (e) {
  url2json(urlField.val());
});

function exclude_key(e) {
  if (e.checked) {
    excludeKeys.push(e.value);
  } else {
    const index = excludeKeys.indexOf(e.value);
    if (index > -1) {
      excludeKeys.splice(index, 1);
    }
  }
  url2json(urlField.val());
};
