"use client";

import { useState, useEffect } from "react";
import { Article, GroupedArticles } from "types/Article";

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
  const [groupedArticles, setGroupedArticles] = useState<GroupedArticles>({});
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
        setGroupedArticles(data.groupedArticles || {});
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
      {Object.entries(groupedArticles).map(([section, articles]) => (
        <div key={section}>
          <h2>{section}</h2>
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
      ))}
    </div>
  );
}
