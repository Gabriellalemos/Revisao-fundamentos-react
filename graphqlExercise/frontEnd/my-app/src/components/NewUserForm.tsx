import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { GET_TASKS } from "../App";

const CREATE_TASK = gql`
  mutation CreateTask($name: String!) {
    createTask(name: $name) {
      id
      name
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState("");
  const [createTask, { data }] = useMutation(CREATE_TASK);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      return;
    }

    await createTask({
      variables: { name },
      refetchQueries: [GET_TASKS],
    });

    console.log(data);
    setName("");
  }
  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
