/*

 akebi 第二世代配架図エディタ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict';

var getGlobal = require('get-global');

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
      GeoJson2SVG(json.data)
    };
    reader.onerror = function(event){
      console.log(event.target.error.code);
    };
    reader.readAsText(f);
  }
}

function GeoJson2SVG(geojson) {

  var svg = CreateSVG();

  document.querySelector('output').appendChild(svg);
  akebi.update(event.target.result);
};

function CreateSVG(){
  var xmlns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(xmlns, 'svg');
  setViewBox(svg, 300, 300)
  return svg;
}

function setViewBox(svg, width, height){
  svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
  svg.setAttributeNS(null, 'width', width);
  svg.setAttributeNS(null, 'height', height);
  return svg;
}

/**
 * open geojson file
 */
akebi.open = function(event){
  handleFileSelect(event)
};

/**
 * update geojson data
 * @param geojson
 */
akebi.update = function(geojson){
  akebi.geojson = geojson;
};

/**
 * download ad file
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
