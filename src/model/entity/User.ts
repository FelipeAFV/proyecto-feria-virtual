
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Profile } from "./Profile";



@Entity({name:"user"})
export class User {

    @PrimaryGeneratedColumn({name: "user_id"})
    id: number;

    @Column({name: "username"})
    //@MinLength(8)
    username: string;
    
    @Column({name: "password"})
    //@MinLength(8)
    password: string;

    @OneToOne(() => Profile, profile => profile.user )
    profile: Profile;

   @Column({default: null})
   resetPasswordToken?: string;
}