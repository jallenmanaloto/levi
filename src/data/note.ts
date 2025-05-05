import { addNote, fetchNotes } from "./api.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';

export function useAddNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNote,
    mutationKey: ['addNote'],
    onSuccess: () => {
      toast.success('Successfully add note.');
      queryClient.invalidateQueries({ queryKey: ['fetchNotes'] });
    },
    onError: () => {
      toast.error('Failed to add note.');
    }
  });
}

export function useFetchNotes(taskId: number) {
  return useQuery({
    queryFn: () => fetchNotes({ taskId }),
    queryKey: ['fetchNotes', taskId]
  });
}
