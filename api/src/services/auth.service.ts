import {HookContext} from "@feathersjs/feathers";
import {NotAuthenticated} from "@feathersjs/errors";

export const authMiddleware = async (context: HookContext) => {
    const token = context.params.headers?.authorization;
    if(token !== undefined &&
        !token.includes("Bearer ") &&
        !checkToken(token.split(" ")[1])) throw new NotAuthenticated();
}

const checkToken = (token: string): boolean => {
    return token === "SUPER_SECURE_TOKEN"
}

export const generateToken = (): string => "SUPER_SECURE_TOKEN";

// Je n'ai pas implemente de lib de hash
// mais bien sur en vrais il faut veritablement hash le mdp
// apres avoir mis un sel secret

export const checkPassword = (password: string, userPassword: string): boolean => {
    return password + "#sel" + "#hash" === userPassword
}

export const securePassword = (password: string): string => {
    return password + "#sel" + "#hash"
}