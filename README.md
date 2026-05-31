# AI Pet 🐾

A retro-styled AI virtual pet built with React + Vite. The pet's
conversational replies are powered by the Google Gemini API.

## Tech stack
- React 18
- Vite 6
- Gemini 2.0 Flash (`generativelanguage.googleapis.com`)

## Getting started

```bash
npm install
cp .env.example .env   # then add your Gemini API key
npm run dev
```

Open the printed local URL in your browser.

## Scripts
- `npm run dev` – start the dev server
- `npm run build` – production build to `dist/`
- `npm run preview` – preview the production build

## Project structure

The codebase follows SOLID principles — each module has a single
responsibility and feature logic is decoupled from the AI provider.

```
src/
├── App.jsx                 # root: top-level navigation only
├── main.jsx                # React bootstrap
├── config/                 # data-driven, extensible settings (Open-Closed)
│   ├── theme.js            #   design tokens (colors / fonts)
│   ├── globalStyles.js     #   global CSS / keyframes
│   ├── sprites.jsx         #   pixel-sprite registry (add a species = 1 entry)
│   ├── personality.js      #   personality tags + species names
│   ├── social.js           #   social graph + relation tiers
│   └── room.js             #   room geometry + furniture catalogue
├── services/               # AI layer (Dependency Inversion)
│   ├── geminiClient.js     #   low-level LLM provider (swappable)
│   ├── petAIService.js     #   prompt-building + parsing (no UI)
│   └── index.js            #   composition root (wires the default client)
├── context/
│   └── PetAIContext.jsx    # injects the pet-AI service into the tree
├── lib/
│   └── isometric.js        # pure, testable grid/iso math
├── hooks/                  # stateful behaviour, separated per concern
│   ├── useChat.js          #   chat state + send workflow
│   ├── useHome.js          #   AI room decoration
│   └── useRoomMovement.js  #   walking, collision, keyboard binding
├── components/             # reusable presentational pieces
│   ├── GlobalStyles.jsx · StarField.jsx · NeonButton.jsx
│   └── Joystick.jsx · RoomSprite.jsx
├── screens/                # onboarding + main shell
│   ├── ScreenShell.jsx · IntroScreen.jsx · ApiKeyScreen.jsx
│   └── CreateScreen.jsx · MainScreen.jsx
└── features/               # tab features (presentational, fed by hooks)
    ├── chat/ChatTab.jsx
    ├── home/HomeTab.jsx · RoomCanvas.jsx
    └── social/SocialTab.jsx
```

### How the layers depend on each other
- **UI** (screens / features / components) depends only on **hooks** + **config**.
- **hooks** depend on the **pet-AI service** through `usePetAI()` — never on `fetch` or Gemini directly.
- Swapping the LLM = replace `geminiClient.js` (or pass a custom `service` to `PetAIProvider`); nothing else changes.

## Notes
- Never commit your real `.env` / API key — `.gitignore` already excludes it.
