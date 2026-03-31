import { useEffect, useState } from "react";
import { getSnippets } from "../api/snippets";
import { useAuth } from "../context/AuthContext";

import SnippetForm from "../components/SnippetForm";
import SnippetList from "../components/SnippetList";

interface Snippet {
  _id: string;
  title: string;
  language: string;
  code: string;
}

function Dashboard() {

  const { user, token, logout } = useAuth();

  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const fetchSnippets = async () => {

    if (!token) return;

    try {

      const data = await getSnippets(token);

      setSnippets(data);
    } catch(err){
        console.error(err)
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSnippets();
  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h1>Welcome {user?.name}</h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr style={{ margin: "30px 0" }} />

      <SnippetForm refreshSnippets={fetchSnippets} />

      <hr style={{ margin: "30px 0" }} />

      <SnippetList
        snippets={snippets}
        refreshSnippets={fetchSnippets}
      />

    </div>
  );
}

export default Dashboard;