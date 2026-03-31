import { useState } from "react";
import { createSnippet } from "../api/snippets";
import { useAuth } from "../context/AuthContext";

interface Props {
  refreshSnippets: () => void;
}

function SnippetForm({ refreshSnippets }: Props) {

  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!token) return;

    try {

      await createSnippet(token, {
        title,
        language,
        code
      });

      setTitle("");
      setLanguage("");
      setCode("");

      refreshSnippets();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to create snippet");
    }
  };

  return (
    <div>

      <h2>Create Snippet</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={6}
          cols={50}
        />

        <br /><br />

        <button type="submit">Save Snippet</button>

      </form>

    </div>
  );
}

export default SnippetForm;