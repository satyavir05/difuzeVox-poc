import { Bank } from "../models/bank";
import http from 'http'
import { RequestOptions } from "https";
import { Header, Controller } from "tsoa";
import { response } from "express";
import { ElasticSearchService } from "./elasticSearchService";

export class BankService{
    public async getBankDetails():Promise<Bank>{   
      const response = await ElasticSearchService.search({
        index: 'bank',
        type: '',
        body: {
            query: {
            match_all: {}
            }
        }
        });
        return response.hits.hits;
    }

}