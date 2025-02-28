import { NextResponse } from "next/server";
import axios from "axios";
import { Article, GroupedArticles } from "types/Article";

const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const API_KEY = process.env.GUARDIAN_API_KEY;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const response = await axios.get(GUARDIAN_API_URL, {
      params: {
        q: query,
        "api-key": API_KEY,
        page: page,
        "page-size": pageSize,
        format: "json",
      },
    });

    const { results, currentPage, pages: totalPages } = response.data.response;

    const articles = results.map(
      ({ webTitle, webUrl, sectionName, webPublicationDate }: any) => ({
        title: webTitle,
        url: webUrl,
        section: sectionName,
        date: webPublicationDate,
      })
    );

    const groupedArticles = articles.reduce(
      (acc: GroupedArticles, article: Article) => {
        if (!acc[article.section]) {
          acc[article.section] = [];
        }
        acc[article.section].push(article);
        return acc;
      },
      {} as GroupedArticles
    );

    return NextResponse.json({ groupedArticles, currentPage, totalPages });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error fetching articles", err.message);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
