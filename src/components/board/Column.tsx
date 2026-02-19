import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task } from "../../features/taskSlice";
import TaskCard from "./TaskCard";

interface ColumnProps {
  state: { id: string; title: string };
  tasks: Task[];
}

function Column({ state, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: state.id });

  return (
    <div
      ref={setNodeRef}
      id={state.id}
      className="w-80 flex-shrink-0 bg-gray-50 p-4 rounded min-h-[200px]"
    >
      <h3 className="font-semibold mb-4">{state.title}</h3>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}

export default React.memo(Column);
