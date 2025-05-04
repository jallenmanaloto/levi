import { toast } from "sonner";
import { addTask, deletTask, fetchTasks, updateTask } from "./api.ts";
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
      toast.error('Failed to add task.');
    }
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    mutationKey: ['updateTask'],
    onSuccess: () => {
      toast.success('Successfully update task.');
      queryClient.invalidateQueries({ queryKey: ['fetchTasks'] });
    },
    onError: () => {
      toast.error('Failed to update task.');
    }
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletTask,
    mutationKey: ['deleteTask'],
    onSuccess: () => {
      toast.success('Successfully deleted task.');
      queryClient.invalidateQueries({ queryKey: ['fetchTasks'] });
    },
    onError: () => {
      toast.error('Failed to delete task.');
    }
  });
}
