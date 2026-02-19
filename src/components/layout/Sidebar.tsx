import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Card } from "@/components/ui/card";

export default function Sidebar() {
  const boards = useSelector((state: RootState) => state.boards.boards);

  return (
    <div className="hidden md:block w-60 border-r p-4 bg-gray-100">
      <h2 className="font-semibold mb-4">Boards</h2>
      {boards.map((board) => (
        <Card
          key={board.id}
          className="p-2 mb-2 cursor-pointer hover:bg-gray-200"
        >
          {board.name}
        </Card>
      ))}
    </div>
  );
}
