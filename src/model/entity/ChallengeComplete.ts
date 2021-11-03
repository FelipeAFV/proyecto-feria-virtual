import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn , Unique} from "typeorm";
import { Challenge } from "./Challenge";
import { Profile } from "./Profile";



@Entity({name:"challenge_complete"})
export class ChallengeComplete {

    @PrimaryGeneratedColumn({name: "challenge_complete_id"})
    id: number;

    @Column({name: "image_name"})
    filename: string;
    
    @Column({
        name: "date",
        type:'date'})
    date: Date;

    @ManyToOne( () => Profile)
    @JoinColumn({name: "profile_id"})
    profile: Profile;

    @ManyToOne(()=> Challenge, challenge=>challenge.challengeComplete)
    @JoinColumn({name: "challenge_id"})
    challenge: Challenge;
}