import {User, UserDto} from "./user.model";
import {UserRepository} from "./user.repository";
import {securePassword} from "../services/auth.service";

const userRepository = new UserRepository();

export const saveUser = async (user: User): Promise<string> => {
    await userRepository.saveNewUser({
        ...user,
        password: securePassword(user.password)
    });
    return "User ("+user.userName+") is create";
}

export const findAll = async ():Promise<UserDto[]> => await userRepository.findAll();
