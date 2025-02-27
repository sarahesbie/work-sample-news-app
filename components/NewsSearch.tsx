"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import NewsResults from "./NewsResults";
import { Article } from "types/Article";

export default function NewsSearch() {
  const [query, setQuery] = useState("");
  const [pinnedArticles, setPinnedArticles] = useState<Article[]>([]);

  const togglePin = (article: Article) => {
    setPinnedArticles((prev) => {
      const isPinned = prev.some((a) => a.url === article.url);

      if (isPinned) {
        return prev.filter((a) => a.url !== article.url);
      } else {
        return [...prev, article];
      }
    });
  };

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      {query ? (
        <NewsResults
          query={query}
          pinnedArticles={pinnedArticles}
          togglePin={togglePin}
        />
      ) : (
        <p>Type a keyword to search for news</p>
      )}

      {pinnedArticles.length > 0 && (
        <div>
          <h2>Pinned Articles</h2>
          {pinnedArticles.map((article) => (
            <div key={article.url}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>{new Date(article.date).toLocaleDateString()}</p>
              <button onClick={() => togglePin(article)}>Unpin</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
