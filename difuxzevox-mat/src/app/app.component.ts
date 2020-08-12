import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UploadService } from './upload.service';
import * as parser from 'fast-xml-parser';
import * as he from 'he';
import { Hero } from './hero';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  isDisplayMessage = false;
  displayMessage = 'Input text is not valid';
  segments = [];
  isSegmentGenerated = false;

  options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
  };

  constructor(private uploadService: UploadService, private http: HttpClient) { }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;

    // this.uploadService.upload(formData).subscribe((data) =>{
    //   console.log('done');
    // });

    this.http.post<any>('http://localhost:4300/files/uploadFile', formData).subscribe(
      (res) => {
        console.log(res);
        this.displayMessage = res.message;
        this.segments = res.segments;
        this.isDisplayMessage = true;
      },
      (err) => {
        this.displayMessage = err;
        console.log(err);
      },
      () =>
      {
       this.isSegmentGenerated =  this.segments.length > 1 ? true : false;
      }
    );
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

}

