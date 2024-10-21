import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  );
}

export default App;
