import { toast } from "sonner";
import { addTask, fetchTasks } from "./api.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchTasks() {
  return useQuery({
    queryFn: async () => fetchTasks(),
    queryKey: ['fetchTasks']
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    mutationKey: ['addTask'],
    onSuccess: () => {
      toast.success('Successfully add task.');
      queryClient.invalidateQueries({ queryKey: ['fetchTasks'] });
    },
    onError: () => {
      toast.error('Failed to add a task.');
    }
  });
}
