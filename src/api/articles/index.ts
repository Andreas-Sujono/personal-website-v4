import { useQuery } from 'react-query';
import axios from 'axios';

export interface Article {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
  pubDate: string;
  categories: string[];
}

export const useGetAllArticles = () => {
  return useQuery({
    queryKey: ['ARTICLES'],
    queryFn: async () => {
      const url =
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@andreassujono';

      const res = await axios.get(url);

      return {
        articles: (res.data?.items || []) as Article[],
      };
    },
    placeholderData: {
      articles: [],
    },
    staleTime: 500000,
  });
};
