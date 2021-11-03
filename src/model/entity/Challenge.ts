import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { ChallengeComplete } from "./ChallengeComplete";
import {Stand} from "./Stand"



@Entity({name:"challenge"})
export class Challenge {

    @PrimaryGeneratedColumn({name: "challenge_id"})
    id: number;

    @Column({name: "url_video", default: null})
    url_video?: string;
    
    @Column({name: "number", default: null})
    number: number;

    @OneToMany( () => ChallengeComplete, ChallengeComplete=>ChallengeComplete.challenge)
    challengeComplete?: ChallengeComplete[];

    @ManyToOne(()=>Stand, stand=>stand.challenges)
    @JoinColumn({name:"stand_id"})
    stand: Stand;
}