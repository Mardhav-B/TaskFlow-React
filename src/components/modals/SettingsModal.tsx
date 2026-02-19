import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import {
  addState,
  deleteState,
  reorderStates,
} from "../../features/boardSlice";
import type { RootState } from "../../app/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function SortableStateItem({
  state,
  onDelete,
}: {
  state: { id: string; title: string };
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: state.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || "none",
      }}
      className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
    >
      <div className="flex items-center gap-2 flex-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div>
          <p className="font-medium">{state.title}</p>
          <p className="text-xs text-gray-500">{state.id}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete(state.id)}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function SettingsModal({ open, setOpen }: Props) {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.boards.states);
  const [newStateName, setNewStateName] = useState("");

  const handleAddState = () => {
    if (newStateName.trim()) {
      dispatch(addState(newStateName.trim()));
      setNewStateName("");
    }
  };

  const handleDeleteState = (stateId: string) => {
    dispatch(deleteState(stateId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = states.findIndex((s) => s.id === active.id);
    const newIndex = states.findIndex((s) => s.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      dispatch(reorderStates({ fromIndex: oldIndex, toIndex: newIndex }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings - Manage States</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Add New State</h3>
            <div className="flex gap-2">
              <Input
                placeholder="State name (e.g., 'Review', 'Testing')"
                value={newStateName}
                onChange={(e) => setNewStateName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddState();
                }}
              />
              <Button onClick={handleAddState}>Add</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Current States</h3>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={states.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {states.map((state) => (
                    <SortableStateItem
                      key={state.id}
                      state={state}
                      onDelete={handleDeleteState}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
