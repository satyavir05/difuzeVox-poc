import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Request,Response,
    SuccessResponse,
    Res,
  } from "tsoa";

import express from "express";
import multer from "multer";
import { UserService } from "../services/userService";
import { Users } from "../models/user";
import { Bank } from "../models/bank";
import { BankService } from "../services/bankService";
  
  @Route("users")
  export class UsersController extends Controller {
    @Get("{userId}")
    public async getUser(
      @Path() userId: number,
      @Query() name?: string
    ): Promise<Users> {
      return new UserService().get(userId, name);
    }

    @Post("uploadFile")
    public async uploadFile(@Request() request: express.Request): Promise<any> {
      await this.handleFile(request);
      // file will be in request.randomFileIsHere, it is a buffer
      return {"message":"file uploaded successfully"};
    }
  
    private handleFile(request: express.Request){
      const storage = multer.diskStorage({
        destination: (request, file, callBack) => {
            callBack(null, 'uploads')
        },
        filename: (request, file, callBack) => {
            callBack(null, `FunOfHeuristic_${file.originalname}`)
        }
      });

      const upload = multer({ storage: storage });

      // const multerSingle = multer().single("randomFileIsHere");
      upload.single('file');
      // return new Promise((resolve, reject) => {
      //   multerSingle(request,request , async (error:any) => {
      //     if (error) {
      //       reject(error);
      //     }
      //     resolve();
      //   });
      // });
    }
}