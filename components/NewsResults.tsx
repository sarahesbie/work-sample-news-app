"use client";

import { useState, useEffect } from "react";
import { Article } from "types/Article";

interface NewsResultsProps {
  query: string;
  pinnedArticles: Article[];
  togglePin: (article: Article) => void;
}

export default function NewsResults({
  query,
  pinnedArticles,
  togglePin,
}: NewsResultsProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (!query) return;
      setIsLoading(true);
      setError(false);

      try {
        const res = await fetch(`/api/guardian?query=${query}`);
        const data = await res.json();
        setArticles(data.articles);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  if (error) return <p>Error fetching data</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {articles.map((article) => {
        const isPinned = pinnedArticles.some((a) => a.url === article.url);
        return (
          <div key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{new Date(article.date).toLocaleDateString()}</p>
            <button onClick={() => togglePin(article)}>
              {isPinned ? "Unpin" : "Pin"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
