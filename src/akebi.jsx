/*

 akebi 第二世代配架図エディタ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict';

var getGlobal = require('get-global');

/**
 * debug
 * @param data
 */
getGlobal().debug = function(data){
  document.querySelector('#debug').style.display = 'block';
  if(typeof data=='string'){
    document.querySelector('#debug').innerText += data;
  }else if(typeof data=='object'){
    document.querySelector('#debug').innerText += JSON.stringify(data);
  }else{
    document.querySelector('#debug').innerText += data.toString();
  }
  document.querySelector('#debug').innerText += '\n';
};


import React from 'react'
import ReactDOM from 'react-dom'

import Index from './view/index.jsx'

/**
 * initialize funciton for akebi
 * @param divId
 * @param akebiOptions
 */

getGlobal().akebi = function(divId, akebiOptions){
  var akebiOptions = {
    open: false
  }
  var options = {
    save: true
  };
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  // merge appOptions to options
  Object.assign(options, akebiOptions);
  ReactDOM.render(
    React.createElement(Index, options),
    document.getElementById(divId)
  );
};

/**
 *
 * @type {null}
 */
akebi.geojson = null;

function handleFileSelect(event){
  // from file input || from drag and drop
  var files = event.target.files || event.dataTransfer.files; // FileList object
  if(!files) return;
  for (var i = 0, f; f = files[i]; i++) {
    // check file type
    // geojson f.type==''
    //if(f.type!='application/json') continue;
    var reader = new FileReader();
    reader.onload = function(event) {
      if(!event.target.result) return;
      var json = JSON.parse(event.target.result);
      if(!json || !json.data) return console.error('no json');
      debug(json);
      akebi.load(json);
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
  handleFileSelect(event);
};

/**
 * load geojson
 * @param geojson
 */
akebi.load = function(geojson){
  akebi.geojson = geojson;
};

/**
 * update geojson
 * @param geojson
 */
akebi.update = function(geojson){
  akebi.geojson = geojson;
  // fire update event
};

/**
 * download as file
 * @param geojson
 */
function downloadAsFile(geojson) {
    var blob = new Blob([geojson]);
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
  if(akebi.geojson){
    downloadAsFile(akebi.geojson)
  }
};
