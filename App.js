import RootLayout from "@/components/layout/RootLayout"
import { Provider } from "react-redux";
import { soulJournalStore } from "./src/store";
import AppContent from "./src/AppContent";

export default function App() {
  return (
    <RootLayout>
      <Provider store={soulJournalStore}>
        <AppContent />
      </Provider>
    </RootLayout>
  );
}