import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class File {
    @Field()
    provider: string;

    @Field()
    title: string;

    @Field()
    url: string;

    @Field()
    type: string;

    @Field()
    extension: string;

    @Field()
    createdAt: string;
}
