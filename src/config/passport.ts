
import { Request } from "express";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { getRepository } from "typeorm";
import { User } from "../model/entity/User";

/**
 * Extraer token de una cookie
 */
const stractMethod = (req: Request) => {
    
    let token = null;
    if (req && req.cookies['jwt']) {
        token = req.cookies['jwt'];
    }
    console.log('Token', token);
    return token;
}

const options: StrategyOptions = {
    jwtFromRequest: stractMethod,
    secretOrKey: 'SECRET',
    
}


/**
 * Passport se encarga de revisar el jwt
 */
const jwtStrategy : JwtStrategy = new JwtStrategy(options,  (payload, done) => {
    const userRepo = getRepository(User);
    console.log(payload, ' payload');
    return userRepo.find({ relations: ['profile'], where: { id: payload.userId}} )
        .then( (users) => {
            const user = users[0];
            if (user) {
                return done(null, user);
            } else  {
                return done('null', false);
            } 

        })
        .catch( (err) => {
            return done(err, null);
        });
    
});

const configure = (passport: any) => {
    passport.use(jwtStrategy);
}

export default configure;

// passport.use(jwtStrategy);
