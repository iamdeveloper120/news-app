import ApiService from "@/services/ApiService";

export class NewsService {
  static async getHeadlines(search) {
    const res = await ApiService.get(
      `top-headlines?country=us${search ? "&q=" + search : ""}`
    );
    return res.articles;
  }

  static async getSourceList() {
    const res = await ApiService.get("sources");
    return res.sources;
  }
}
