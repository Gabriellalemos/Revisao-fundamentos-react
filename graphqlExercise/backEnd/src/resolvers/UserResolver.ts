import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../models/Task";

@Resolver()
export class TaskResolver {
  private data: Task[] = [
    { id: "1", name: "Comprar feijão" },
    { id: "2", name: "Ir ao shopping" },
  ];

  @Query(() => [Task])
  async tasks() {
    return this.data;
  }

  @Mutation(() => Task)
  async createTask(@Arg("name") name: string) {
    const task = {
      id: this.generateId(),
      name: name,
    };

    this.data.push(task);
    return task;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
}
