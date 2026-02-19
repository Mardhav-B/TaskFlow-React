import React from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { deleteTask } from "../../features/taskSlice";
import type { Task } from "../../features/taskSlice";
import { Badge } from "@/components/ui/badge";

interface Props {
  task: Task;
}

const priorityColors: Record<Task["priority"], string> = {
  Urgent: "bg-red-600 text-white",
  High: "bg-red-500 text-white",
  Mid: "bg-yellow-400 text-black",
  Low: "bg-gray-400 text-white",
};

function TaskCard({ task }: Props) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || "none",
        touchAction: "none",
      }}
      className="bg-white p-3 mb-3 rounded shadow select-none hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <div className="mt-1 flex-shrink-0">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{task.name}</h4>
          <p className="text-xs text-gray-500">{task.description}</p>
          <div className="flex justify-between mt-2 items-center gap-2">
            <div className="flex items-center gap-2">
              <Badge className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            <button
              onClick={handleDelete}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
            <span>{task.assignee}</span>
            <span>Deadline: {task.deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TaskCard);
