import CustomForm from "@/components/CustomForm";
import TaskList from "@/components/TaskList";
import "./globals.css";
import Link from "next/link";

export default function Home() {

  return (

    <div className="container">
      <header>

        <div style={{ fontSize: "30px", marginBottom: "10px" }}>
          <Link style={{ paddingRight: "10px" }} href="/dashboard">Dashboard</Link>
          <Link href="/utilisateur">Utilisateurs</Link>
        </div>
        <h1>Bienvenu dans la liste des tâches</h1>
      </header>
      <CustomForm />
      <TaskList
      />
    </div>
  );
}