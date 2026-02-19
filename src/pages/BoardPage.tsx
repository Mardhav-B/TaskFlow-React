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
    <div className="h-screen bg-gray-100">
      <Navbar
        onCreate={() => setCreateOpen(true)}
        onSettings={() => setSettingsOpen(true)}
      />
      <Sidebar />
      <div className="mt-16 md:ml-60 h-[calc(100vh-4rem)] overflow-auto">
        <Board />
      </div>
      <CreateTaskModal open={createOpen} setOpen={setCreateOpen} />
      <SettingsModal open={settingsOpen} setOpen={setSettingsOpen} />
    </div>
  );
}
