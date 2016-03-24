/*

 akebi 第二世代配架図エディタ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict';

var getGlobal = require('get-global');
var geojson2svg = require('geojson2svg');

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
      var geojson = JSON.parse(event.target.result);
      GeoJson2SVG(geojson)
    };
    reader.onerror = function(event){
      console.log(event.target.error.code);
    };
    reader.readAsText(f);
  }
}

function GeoJson2SVG(geojson) {

  var options = {
    viewportSize: {width: 300, height: 300},
    mapExtent: {left: -180, bottom: -90, right: 180, top: 90},
    output: 'svg',
    attributes: {
      'stroke-width': 100,
      'stroke': 'blue',
      'fill': 'none',
    },
    pointAsCircle: true,
    callback: function(svgString){
      console.log(svgString);
    }
  };
  var converter = geojson2svg(options);
  var svgPaths = converter.convert(geojson,options);

  var svg = CreateSVG();
  svg.innerHTML = svgPaths.join('');

  document.querySelector('output').appendChild(svg);
  akebi.update(event.target.result);
};

function CreateSVG(){
  var xmlns = 'http://www.w3.org/2000/svg';
  var boxWidth = 300;
  var boxHeight = 300;
  var svgElem = document.createElementNS(xmlns, 'svg');
  svgElem.setAttributeNS(null, 'viewBox', '0 0 ' + boxWidth + ' ' + boxHeight);
  svgElem.setAttributeNS(null, 'width', boxWidth);
  svgElem.setAttributeNS(null, 'height', boxHeight);
  svgElem.style.display = 'block';
  return svgElem;
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
