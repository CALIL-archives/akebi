/*

 akebi 第二世代配架図エディタ
 トップページ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

class Akebi extends React.Component {
  render() {

  }
}


/**
 * akebiのスタート関数
 * @param id - divのid
 * @param options - オプション
 */

window.akebi = function(id, options){
  document.getElementById(id).innerText = 'akebi';
}
