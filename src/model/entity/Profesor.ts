import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Role } from "../interface/role";
import { Profile } from "./Profile";



@Entity({name:"profesor"})
export class Profesor implements Role {

    @PrimaryGeneratedColumn({name: "profesor_id"})
    id: number;

    @Column({name: "school"})
    school: string;
    
    @Column({name: "subject"})
    subject: string;

    @OneToOne( () => Profile,{cascade : false})
    @JoinColumn({name: "profile_id"})
    profile: Profile;
}