/*

 akebi 第二世代配架図エディタ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict';

var getGlobal = require("get-global");
import React from 'react'
import ReactDOM from 'react-dom'

import Index from './view/index.jsx'

/**
 * initialize funciton for akebi
 * @param divId
 * @param options
 */

getGlobal().akebi = function(divId, options){
  ReactDOM.render(
    React.createElement(Index, options),
    document.getElementById(divId)
  )
}

/**
 *
 * @type {null}
 */
akebi.content = null;

function handleFileSelect(event){
  // from file input || from drag and drop
  var files = event.target.files || event.dataTransfer.files; // FileList object
  if(!files) return;
  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    // check file type
    if(f.type!='application/json') continue;
    var reader = new FileReader();
    reader.onload = function(event) {
      document.querySelector('output').innerHTML = event.target.result;
      akebi.update(event.target.result);
    };
    reader.onerror = function(event){
      console.log(event.target.error.code);
    };
    reader.readAsText(f);
  }
}

/**
 * open geojson file
 */
akebi.open = function(event){
  handleFileSelect(event)
};

akebi.update = function(content){
  akebi.content = content;
}

/**
 * download ad file
 * @param content
 */
function downloadAsFile(content) {
    var blob = new Blob([content]);
    var url = window.URL || window.webkitURL;
    var blobURL = url.createObjectURL(blob);

    var a = document.createElement('a');
    a.download = 'akebi.svg';
    a.href = blobURL;
    a.click();
};

/**
 * save geojson file
 */
akebi.save = function(){
  if(akebi.content){
    downloadAsFile(akebi.content)
  }
};
