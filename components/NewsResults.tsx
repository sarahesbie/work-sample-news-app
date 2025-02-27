"use client";

import { useState, useEffect } from "react";

interface Article {
  title: string;
  url: string;
  date: string;
}

interface NewsResultsProps {
  query: string;
}

export default function NewsResults({ query }: NewsResultsProps) {
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
      {articles.map((article) => (
        <div key={article.url}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
          <p>{new Date(article.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
