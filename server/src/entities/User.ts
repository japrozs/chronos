import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ default: false })
    verified: boolean;

    @Column()
    verificationCode: string;

    @Field()
    @Column({ default: false })
    githubLinked: boolean;

    @Column({ default: "" })
    githubAccessToken: string;

    @Field()
    @Column({ default: false })
    googleLinked: boolean;

    @Column({ default: "" })
    googleRefreshToken: string;

    @Field()
    @Column({ default: false })
    figmaLinked: boolean;

    @Column({ default: "" })
    figmaRefreshToken: string;

    @Field()
    @Column({ default: false })
    dropboxLinked: boolean;

    @Column({ default: "" })
    dropboxRefreshToken: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
