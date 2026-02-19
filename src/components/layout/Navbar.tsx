import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onCreate: () => void;
  onSettings: () => void;
}

export default function Navbar({ onCreate, onSettings }: NavbarProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-bold">TaskFlow</h1>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onSettings} size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button onClick={onCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>
    </div>
  );
}
