import React, { useMemo } from "react";
import { DndContext, rectIntersection, type DragEndEvent } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { moveTask } from "../../features/taskSlice";
import type { RootState } from "../../app/store";
import Column from "./Column";

export default function Board() {
  const dispatch = useDispatch();
  const boardsState = useSelector((state: RootState) => state.boards);
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);

  const states = boardsState?.states || [];

  const tasksByState = useMemo(() => {
    const map: Record<string, typeof allTasks> = {};
    states.forEach((state) => {
      map[state.id] = allTasks.filter((t) => t.state === state.id);
    });
    return map;
  }, [allTasks, states]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const targetTaskId = over.id as string;
    const targetTask = allTasks.find((t) => t.id === targetTaskId);
    const newState = targetTask?.state || over.id;

    dispatch(
      moveTask({ taskId: active.id as string, newState: newState as string }),
    );
  };

  if (!states.length) {
    return <div className="p-4 text-gray-500">No columns found</div>;
  }

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto min-h-[400px]">
        {states.map((state) => (
          <Column
            key={state.id}
            state={state}
            tasks={tasksByState[state.id] || []}
          />
        ))}
      </div>
    </DndContext>
  );
}
