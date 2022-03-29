import {generateToken} from "../services/auth.service";

import {login} from "./auth.service";
import {LoginInfo} from "./auth.model";

export class AuthRoot {
    create = async (data: LoginInfo) => {
        await login(data)
        return {
            "message": "login successful",
            "tokenType": "Bearer",
            "token": generateToken()
        }
    }
}