import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  return (
    <>
      <Button
        onClick={() => {
          console.log("clicked");
        }}
      >
        Click me
      </Button>
    </>
  );
}

export default App;
