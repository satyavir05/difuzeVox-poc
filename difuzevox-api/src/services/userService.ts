import { Users } from "../models/user";

export class UserService {
    public get(id: number, name?: string): Users {
        return {
            id: 12, name: "satyavir"
        };
    }

    public uploadService(file :FormData){
        return {
            id: 12, name: "satyavir"
        };
    }
}