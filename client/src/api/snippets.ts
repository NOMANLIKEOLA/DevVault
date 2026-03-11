import api from "./axios";

export const getSnippets = async (token: string) => {
  const response = await api.get("/snippets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createSnippet = async (
  token: string,
  snippet: {
    title: string;
    code: string;
    language: string;
  }
) => {
  const response = await api.post("/snippets", snippet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteSnippet = async (token: string, id: string) => {
  const response = await api.delete(`/snippets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};