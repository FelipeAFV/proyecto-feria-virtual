import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Challenge } from "./Challenge";
import { Video } from "./Video";



@Entity({name:"stand"})
export class Stand{

    @PrimaryGeneratedColumn({name: "stand_id"})
    id: number;

    @Column({name: "theme"})
    theme: string;

    @Column({name: "image_logo_name", default: null})
    image_logo?: string;

    @Column({name: "image_background_name", default: null})
    image_background?: string;
    

    @OneToMany( () => Challenge, Challenge => Challenge.stand)
    challenges?: Challenge[];

    @OneToMany(()=> Video, Video=> Video.stand)
    videos?: Video[];
}