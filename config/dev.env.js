'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: '"http://localhost:8080/epc"',
  frontUrl: '"http://localhost:8091"',
  appId:'"1580387213331704"',
  aesKey:'"S9u978Q31NGPGc5H"',
  ivKey:'"X83yESM9iShLxfwS"',
  appKey:'"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi"',
})
