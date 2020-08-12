import { Get, Route, Security, Response, Post, Request } from "tsoa";
import express from "express";
import multer from "multer";
import { sign } from "crypto";
import { upload } from "../app";
import xmlbuilder from "xmlbuilder";
// const rp = require("request-promise");
import fs from "fs";
import xml2js from 'xml2js';
// const readline = require("readline-sync");
const DOMParser = require("xmldom").DOMParser;
// const XMLSerializer = require("xmldom").XMLSerializer;

@Route("files")
export class FilesController {
  @Post("uploadFile")
  public async uploadFile(@Request() request: express.Request): Promise<any> {
    await this.handleFile(request);
    // file will be in request.randomFileIsHere, it is a buffer
    //
    console.log('check this', request.file.filename, request.file.originalname);
    return { "message": "file uploaded successfully", "segments": this.generateTTMLSegments('uploads/' + request.file.filename) };
  }

  private handleFile(request: express.Request): Promise<any> {
    let test: any;
    const multerSingle = upload.single('file');
    return new Promise((resolve, reject) => {
      multerSingle(request, test, async (error: any) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  //  extracting segments from the xml file , these segments will be used to
  //  generate the ssml segments .
  generateTTMLSegments(filePath: string) {
    let xml_string = fs.readFileSync(filePath, "utf8");
    xml_string = xml_string.replace(/<br\/>/g, " ");

    var parser1 = new DOMParser();
    var xmlDoc = parser1.parseFromString(xml_string, 'text/xml');
    var pTag = xmlDoc.getElementsByTagName("p");

    var expectedObj = [];

    for (var i = 0; i < pTag.length; i++) {
      expectedObj.push({
        "tcIn": pTag[i].getAttribute('begin'),
        "segmentMaxDuration": pTag[i].getAttribute('end') + ' - ' + pTag[i].getAttribute('begin'),
        "segmentName": 'testing',
        "segmentData": pTag[i].childNodes[0].nodeValue.trim()
      });
    }

    return expectedObj;
  }

  generateSSMLSegments(ttmlSegmentArray: Array<any>) {
    var ttmlSegment = '';
    var ssmlSegmentList = []

    ttmlSegmentArray.forEach(segment => {
      ttmlSegment = '';
      var ssmlSegmentString = '<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">' +
        '<voice name="en-IN-NeerjaNeural">' +
        '<mstts:express-as style="General">' +
        '<prosody rate="14%" pitch="3%">' +
        ttmlSegment +
        '</prosody>' +
        '</mstts:express-as>' +
        '</voice>' +
        '</speak>';

        ssmlSegmentList.push(
        ssmlSegmentString
      );

    });
  }

}