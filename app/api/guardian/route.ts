import { NextResponse } from "next/server";
import axios from "axios";

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

    const articles = response.data.response.results.map((article: any) => ({
      title: article.webTitle,
      url: article.webUrl,
      section: article.sectionName,
      date: article.webPublicationDate,
    }));

    return NextResponse.json({
      articles: response.data.response.results.map((article: any) => ({
        title: article.webTitle,
        url: article.webUrl,
        section: article.sectionName,
        date: article.webPublicationDate,
      })),
      currentPage: response.data.response.currentPage,
      totalPages: response.data.response.pages,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error fetching articles", err.message);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
