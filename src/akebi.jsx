/*

 akebi 第二世代配架図エディタ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict';

var getGlobal = require('get-global');

class Util {
    static getValName(val) {
      if(typeof val !== 'function') {
        return '';
      }
      return val.name;
    }
}

/**
 * debug
 * @param data
 * @param divID
 */
getGlobal().debug = function(data, keylist = false, divID = '#debug') {
  let debugDIV = document.querySelector(divID);
  debugDIV.style.display = 'block';
  let name = Util.getValName(data)
  if(name) {
    debugDIV.innerText += `${name}:`;
  }
  if (typeof data === 'undefined') {
    debugDIV.innerText += 'undefined';
  }else if(typeof data === 'string') {
    debugDIV.innerText += data;
  }else if(typeof data === 'object') {
    // list the keys of object
    if(keylist) {
      for (let k in data) {
        debug(k);
      }
    }else{
      try{
        debugDIV.innerText += JSON.stringify(data);
      }catch(e) {
        debugDIV.innerText += data.outerHTML;
      }
    }
  }else{
    debugDIV.innerText += data.toString();
  }
  debugDIV.innerText += '\n';
};


// the min and max values from a JavaScript Array
// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
/**
 * get the max value from Array
 * @param array
 * @returns {number}
 */
getGlobal().getMin = function(array){
  return Math.min.apply(Math,array);
};
/**
 * get the min value from Array
 * @param array
 * @returns {number}
 */
getGlobal().getMax = function(array){
  return Math.max.apply(Math,array);
};


import React from 'react'
import ReactDOM from 'react-dom'

import request from 'superagent'

import Index from './index.jsx'

/**
 * akebi class
 * @param divId
 * @param akebiOptions
 */


getGlobal().akebi = class {
  constructor(divId, akebiOption) {
    this.geojson = null;
    this.react = null;
    var akebiOptions = {
      open: false,
      akebi: this,
      width: 800,
      height: 600
    };
    var options = {
      save: true
    };
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    // merge appOptions to options
    Object.assign(options, akebiOptions);

    // load json
    request
      .get('/example/sample.json')
      .send({})
      .set('Accept', 'application/json')
      .end(function(error, res){
        if(!error){
          // res.body.data.haika
          // res.body.data.features
          // debug(res.body.data.haika, true);
          this.geojson = res.body.data.features;
          this.react = ReactDOM.render(
            React.createElement(Index, options),
            document.getElementById(divId)
          );
        }
      }.bind(this));
  }
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
