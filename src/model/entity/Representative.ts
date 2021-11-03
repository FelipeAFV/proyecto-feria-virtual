import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Role } from "../interface/role";
import { Profile } from "./Profile";
import {Student} from "./Student";



@Entity({name:"representative"})
export class Representative implements Role {

    @PrimaryGeneratedColumn({name: "representative_id"})
    id: number;

    @Column({name: "child_number"})
    childNumber: number;
    
    @OneToOne( () => Profile,{cascade : false})
    @JoinColumn({name: "profile_id"})
    profile: Profile;

    @OneToMany(() => Student, student => student.representative)
    students?: Student[];
}