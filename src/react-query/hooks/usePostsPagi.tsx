import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

interface InfinitePostQuery {
  pageSize: number;
}

const usePostsPagi = (query: InfinitePostQuery) =>
  // const fetchPosts = () =>
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts", {
  //       params: {
  //         _start: (query.page - 1) * query.pageSize,
  //         _limit: query.pageSize,
  //       },
  //     })
  //     .then((res) => res.data);

  // return useQuery<Post[], Error>({
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query], // toplevel object, query - any time the query changes react query will fetch the posts from the backend
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, //1min
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
export default usePostsPagi;
