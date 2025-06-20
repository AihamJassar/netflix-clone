import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

export const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingCOntent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.results);
    };
    getTrendingCOntent();
  }, [contentType]);

  return { trendingContent };
};
