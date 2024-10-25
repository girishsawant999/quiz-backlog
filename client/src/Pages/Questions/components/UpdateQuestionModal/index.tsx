import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateQuestion } from "../../api";
import { QuestionSchema } from "../../schema";

type UpdateQuestionModalProps = {
  question: TQuestion;
  onClose: () => void;
};

const UpdateQuestionModal: React.FC<UpdateQuestionModalProps> = ({
  question,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(QuestionSchema),
    defaultValues: question,
  });

  const mutation = useMutation(updateQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
      toast({ title: "Question updated successfully" });
      onClose();
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={!!question} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter question title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more fields as necessary */}
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuestionModal;
