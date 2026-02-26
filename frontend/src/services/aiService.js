import axios from 'axios';

const API_BASE = '/api/ai';

function getConfig(token) {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

export const aiService = {
  async summarize(content, token) {
    const { data } = await axios.post(`${API_BASE}/summarize`, { content }, getConfig(token));
    return data;
  },
  async suggestTitle(content, token) {
    const { data } = await axios.post(`${API_BASE}/suggest-title`, { content }, getConfig(token));
    return data;
  },
  async improve(content, style, token) {
    const { data } = await axios.post(`${API_BASE}/improve`, { content, style }, getConfig(token));
    return data;
  },
  async suggestCategory(title, content, token) {
    const { data } = await axios.post(
      `${API_BASE}/suggest-category`,
      { title, content },
      getConfig(token)
    );
    return data;
  },
  async expand(content, token) {
    const { data } = await axios.post(`${API_BASE}/expand`, { content }, getConfig(token));
    return data;
  },
  async chat(message, history, token) {
    const { data } = await axios.post(
      `${API_BASE}/chat`,
      { message, history },
      getConfig(token)
    );
    return data;
  },
};
