import {Model} from "mongoose";

import {MongooseService} from "../services/mongoose.service";

import {UserSchema} from "./user.schema";
import {User, UserDto} from "./user.model";

export class UserRepository {
    mongooseSingleton = MongooseService.getInstance();
    model: Model<User>;

    public constructor() {
        this.model = this.mongooseSingleton.addModel("users", UserSchema)
    }

     saveNewUser = async (user: User) => {
        const newUser = new this.model({...user});
        newUser.save((err) => {
            if (err) console.error("Error on new User save", err.message);
        })
    }

    findAll = async (): Promise<UserDto[]> => await this.model
        .find({}, {_id: 0, __v: 0, password: 0}).exec();

    findPasswordByEmail = async (email: string): Promise<{password: string } | null> => await this.model
        .findOne({email: email}, {password: 1, _id:0} )
        .exec()

}