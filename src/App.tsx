import "./App.css";
import BackgroundAnimation from "./features/common/components/BackgroundAnimation";
import Router from "./features/routes/Router";

function App() {
  return (
    <div className="flex-col text-(--primary-text) bg-(--primary-bg)">
      <BackgroundAnimation />
      <div className="flex flex-row">
        <Router />
      </div>
    </div>
  );
}

export default App;
