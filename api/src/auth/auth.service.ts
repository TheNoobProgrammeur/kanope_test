import {UserRepository} from "../user/user.repository";
import {LoginInfo} from "./auth.model";
import {NotAuthenticated, NotFound} from "@feathersjs/errors";
import {checkPassword} from "../services/auth.service";

const userRepository = new UserRepository();

export const login = async (loginInfo: LoginInfo): Promise<boolean> => {
  const password = await userRepository.findPasswordByEmail(loginInfo.email);
  if(password === null) throw new NotFound();
  if(!checkPassword(loginInfo.password, password.password)) throw new NotAuthenticated();
  return true;
}