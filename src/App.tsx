import { AttendeeList } from "./components/AttendeeList";
import { Herder } from "./components/Herder";
import "./index.css";
export function App() {
  return (
    <div className="flex flex-col gap-5 max-w-[1216px] mx-auto py-5 ">
      <Herder />
      <AttendeeList />
    </div>
  );
}
