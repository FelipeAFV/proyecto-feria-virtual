import { compare, hash} from "bcrypt";

export async function encrypt(plainPassword: string): Promise<string> {
    let encryptedPassword = await hash(plainPassword, 10);
    return encryptedPassword;

}


export async function compareHashedPassword(plainPassword: string, hashedPassword: string) {
    let isValid =  await compare(plainPassword, hashedPassword);

    return isValid;
}


