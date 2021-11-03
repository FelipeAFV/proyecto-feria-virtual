import { User as UserModel } from "../model/entity/User";

declare global {
    namespace Express {
        // These open interfaces may be extended in an application-specific manner via declaration merging.
        // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
        interface Request {
            challengeImage,

        }

        interface User extends UserModel {}
        interface Response {}
        interface Application {}
    }
}
