/*

 akebi 第二世代配架図エディタ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict'

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


function handleFileSelect(event){
  // from file input || from drag and drop
  var files = event.target.files || event.dataTransfer.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    // check file type
    if(f.type!='image/svg+xml') continue;
    var reader = new FileReader();
    reader.onload = function(event) {
      document.querySelector('output').innerHTML = event.target.result;
    };
    reader.onerror = function(event){
      console.log(event.target.error.code);
    };
    reader.readAsText(f);
  }
}


/**
 * open svg file
 */
akebi.open = function(event){
  // open svg
  //alert('open svg')
  //document.querySelector('output').innerHTML = event
  handleFileSelect(event)
}

/**
 * save svg file
 */
akebi.save = function(){
  // save svg
  // download svg on browser
  alert('save svg')
}
