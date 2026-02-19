import { useState } from "react";
import Board from "../components/board/Board";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import SettingsModal from "../components/modals/SettingsModal";

export default function BoardPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar
          onCreate={() => setCreateOpen(true)}
          onSettings={() => setSettingsOpen(true)}
        />
        <Board />
      </div>
      <CreateTaskModal open={createOpen} setOpen={setCreateOpen} />
      <SettingsModal open={settingsOpen} setOpen={setSettingsOpen} />
    </div>
  );
}
