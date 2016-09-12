'use strict'

const DATA_RIO_URL = 'http://dadosabertos.rio.rj.gov.br/apisaude/apresentacao/csv/ati_.csv';

var iconv = require('iconv-lite');

//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({constructResult:false}); //for big csv data

var request = require("request");

var removeFirstLine = require('./util/remove-first-line')();

var AutoDetectDecoderStream = require('autodetect-decoder-stream');

converter.on("record_parsed", function (json) {
  console.log(json);
});

request
  .get(DATA_RIO_URL)
  .pipe(removeFirstLine)
  // .pipe(iconv.decodeStream())
  // .pipe(new AutoDetectDecoderStream({defaultEncoding: 'latin1'}))
  // .pipe(iconv.encodeStream('ISO-8859-1'))
  // .pipe(iconv.encodeStream('latin_1'))
  // .pipe(iconv.encodeStream('utf8'))
  .pipe(converter);
