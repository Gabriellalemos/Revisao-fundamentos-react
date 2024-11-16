import React from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";
import { NewUserForm } from "./components/NewUserForm";

type Task = {
  id: string;
  name: string;
};

export const GET_TASKS = gql`
  query {
    tasks {
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ tasks: Task[] }>(GET_TASKS);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div
        style={{
          backgroundColor: "#191970",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "10px",
          margin: "30px",
        }}
      >
        <h1>Lista de Tarefas</h1>
        <ul>
          {data?.tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
        <NewUserForm />
      </div>
    </div>
  );
}

export default App;
