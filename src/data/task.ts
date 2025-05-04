import { fetchTasks } from "./api.ts";
import { useQuery } from "@tanstack/react-query";

export function useFetchTasks() {
  return useQuery({
    queryFn: async () => fetchTasks(),
    queryKey: ['fetchTasks']
  });
}
