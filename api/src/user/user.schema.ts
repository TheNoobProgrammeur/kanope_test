import {Schema} from "mongoose";

import {User} from "./user.model";

export const UserSchema = new Schema<User>({
    userName: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String
})