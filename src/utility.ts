import { access } from "fs/promises";
import { constants } from "fs";

export async function canReadFile(path: string): Promise<boolean> {
    try {
        await access(path, constants.R_OK);
    }
    catch (err: unknown) {
        return false;
    }

    return true;
}

export async function canWriteFile(path: string): Promise<boolean> {
    try {
        await access(path, constants.W_OK);
    }
    catch (err: unknown) {
        return false;
    }

    return true;
}
