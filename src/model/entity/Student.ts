import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Representative } from "./Representative";
import { Profile } from "./Profile";
import { Role } from "../interface/role";



@Entity({name:"student"})
export class Student implements Role  {

    @PrimaryGeneratedColumn({name: "student_id"})
    id: number;

    @Column({name: "school"})
    school: string;
    
    @Column({name: "grade"})
    grade: string;

    @OneToOne( () => Profile,{cascade : false})
    @JoinColumn({name: "profile_id"})
    profile: Profile;

    @ManyToOne(()=>Representative, representative => representative.students)
    representative?: Representative;
}