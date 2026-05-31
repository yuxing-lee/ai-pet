import { useState } from "react";
import { PetAIProvider } from "./context/PetAIContext.jsx";
import IntroScreen from "./screens/IntroScreen.jsx";
import ApiKeyScreen from "./screens/ApiKeyScreen.jsx";
import CreateScreen from "./screens/CreateScreen.jsx";
import MainScreen from "./screens/MainScreen.jsx";

/**
 * Root: owns only top-level navigation + the session essentials (apiKey, pet).
 * Feature logic lives in hooks; AI access is injected via PetAIProvider.
 */
export default function App() {
  const [screen, setScreen] = useState("intro");
  const [apiKey, setApiKey] = useState("");
  const [apiInput, setApiInput] = useState("");
  const [pet, setPet] = useState(null);
  const [tab, setTab] = useState("chat");

  if (screen === "intro")
    return <IntroScreen onNext={() => setScreen("apikey")} />;

  if (screen === "apikey")
    return (
      <ApiKeyScreen
        value={apiInput}
        setValue={setApiInput}
        onNext={() => { setApiKey(apiInput); setScreen("create"); }}
      />
    );

  if (screen === "create")
    return <CreateScreen onDone={(p) => { setPet(p); setScreen("main"); }} />;

  return (
    <PetAIProvider>
      <MainScreen pet={pet} apiKey={apiKey} tab={tab} setTab={setTab} />
    </PetAIProvider>
  );
}
