import {User, UserDto} from "./user.model";
import {saveUser, findAll} from "./user.service";

export class UserRoot {
    create = async (user: User): Promise<{message: string}> => {
        const message = await saveUser(user);
        return {"message": message}
    }

    find = async  () : Promise<UserDto[]> => {
        return await findAll()
    }
}