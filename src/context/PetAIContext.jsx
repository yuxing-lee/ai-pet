import { createContext, useContext, useMemo } from "react";
import { createDefaultPetAIService } from "../services/index.js";

const PetAIContext = createContext(null);

/**
 * Injects the pet AI service into the tree. Tests or alternate providers can
 * pass their own `service` prop; production uses the default Gemini wiring.
 */
export function PetAIProvider({ service, children }) {
  const value = useMemo(() => service || createDefaultPetAIService(), [service]);
  return <PetAIContext.Provider value={value}>{children}</PetAIContext.Provider>;
}

export function usePetAI() {
  const ctx = useContext(PetAIContext);
  if (!ctx) throw new Error("usePetAI must be used inside <PetAIProvider>");
  return ctx;
}
