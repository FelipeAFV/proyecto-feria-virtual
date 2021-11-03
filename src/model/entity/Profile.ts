import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { UserRole } from "../enums/user-role";
import { ChallengeComplete } from "./ChallengeComplete";
import { User } from "./User";



@Entity({name:"profile"})
export class Profile {

    @PrimaryGeneratedColumn({name: "profile_id"})
    id: number;

    @Column({name: "first_name"})
    firstName: string;
    
    @Column({name: "last_name"})
    lastName: string;
    
    @Column({name: "email"})
    email: string;

    @Column({name: "phone"})
    phone: string;

    @Column({name: "address"})
    address: string;

    @Column({name: "condominium"})
    condominium: string;


    @Column({
        type: "enum",
        enum: UserRole,
    })
    role: UserRole;

    @OneToOne( () => User, user=>user.profile, {cascade : false})
    @JoinColumn({name: "user_id"})
    user: User;

}