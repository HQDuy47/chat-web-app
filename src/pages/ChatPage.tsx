import ListMessages from "../components/ListMessages";
import DetailMessage from "../components/DetailMessage";

export default function ChatPage() {
  return (
    <div>
      <p className="text-2xl font-bold text-gray-700">Chat</p>
      <div className="flex flex-col md:flex-row px-2 py-4 gap-2">
        <div className="w-full md:w-2/5 ">
          <ListMessages />
        </div>
        <div className="w-full md:w-3/5 ">
          <DetailMessage />
        </div>
      </div>
    </div>
  );
}
