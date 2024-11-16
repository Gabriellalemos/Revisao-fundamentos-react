import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Task {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;
}
