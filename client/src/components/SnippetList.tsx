import { deleteSnippet } from "../api/snippets";
import { useAuth } from "../context/AuthContext";

interface Snippet {
  _id: string;
  title: string;
  language: string;
  code: string;
}

interface Props {
  snippets: Snippet[];
  refreshSnippets: () => void;
}

function SnippetList({ snippets, refreshSnippets }: Props) {

  const { token } = useAuth();

  const handleDelete = async (id: string) => {

    if (!token) return;

    try {

      await deleteSnippet(token, id);

      refreshSnippets();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to delete snippet");
    }
  };

  return (
    <div>

      <h2>Your Snippets</h2>

      {snippets.length === 0 && <p>No snippets yet.</p>}

      {snippets.map((snippet) => (

        <div
          key={snippet._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px"
          }}
        >

          <h3>{snippet.title}</h3>

          <p><b>Language:</b> {snippet.language}</p>

          <pre
            style={{
              background: "#111",
              padding: "10px",
              overflow: "auto"
            }}
          >
            {snippet.code}
          </pre>

          <button onClick={() => handleDelete(snippet._id)}>
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default SnippetList;