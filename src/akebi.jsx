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

/**
 * open svg file
 */
akebi.open = function(){
  // open svg
  alert('open svg')
}

/**
 * save svg file
 */
akebi.save = function(){
  // save svg
  // download svg on browser
  alert('save svg')
}
