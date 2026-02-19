import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/taskSlice";
import type { Task } from "../../features/taskSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function CreateTaskModal({ open, setOpen }: Props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<Omit<Task, "id" | "state">>({
    name: "",
    description: "",
    assignee: "",
    priority: "High",
    deadline: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const isValid =
    form.name.trim() !== "" &&
    form.description.trim() !== "" &&
    form.assignee.trim() !== "" &&
    form.deadline.trim() !== "" &&
    form.priority.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    dispatch(addTask({ ...form, state: "todo" }));
    setOpen(false);
    setForm({
      name: "",
      description: "",
      assignee: "",
      priority: "High",
      deadline: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Task Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Input
            placeholder="Assignee"
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
          />

          <Input
            type="date"
            min={today}
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />

          <Select
            value={form.priority}
            onValueChange={(value) =>
              setForm({ ...form, priority: value as Task["priority"] })
            }
          >
            <SelectTrigger className="bg-white border border-gray-300">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Urgent">Urgent</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Mid">Mid</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            {!isValid && (
              <span className="text-sm text-red-600">
                All fields are required
              </span>
            )}
            <Button onClick={handleSubmit} disabled={!isValid}>
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
