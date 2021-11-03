import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Stand } from "./Stand";



@Entity({name:"video"})
export class Video{

    @PrimaryGeneratedColumn({name: "video_id"})
    id: number;

    @Column({name: "video_url"})
    url: string;

    @ManyToOne(()=>Stand,Stand=>Stand.videos)
    @JoinColumn({name:"stand_id"})
    stand: Stand;

}