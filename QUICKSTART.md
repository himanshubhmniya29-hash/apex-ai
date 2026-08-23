# APEX JARVIS - QUICK START GUIDE

## 🎯 5-Minute Setup

```bash
# 1. Navigate to project
cd apex-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

## 📋 What You Get

✅ **Complete Chat Interface**
- Send/receive messages
- Real-time typing indicators
- Message copy functionality
- Conversation history

✅ **Memory System**
- Short-term memory (current session)
- Long-term memory (persistent)
- Episodic memory (events)
- Search across all memories

✅ **Tool Registry**
- 30+ pre-configured tools
- 6 tool categories
- Tool usage tracking
- Quick-access toolbar

✅ **Permissions Management**
- Create custom profiles
- Set role-based permissions
- Control tool access
- Privacy management

✅ **Settings Panel**
- Theme configuration
- Language selection
- Voice settings
- Notification preferences
- AI provider setup

✅ **Live Activity Panel**
- Real-time operation monitoring
- Progress indicators
- Status visualization
- Activity history

## 🎮 How to Use

### 1. Create a Conversation
- Click **"New Chat"** button in sidebar
- Conversation appears at top of list
- Automatically selected

### 2. Send Messages
- Type in input area at bottom
- Press **Enter** to send
- Press **Shift+Enter** for new line
- Click **⚡ Send** button

### 3. Browse Tools
- Click **"Tools"** tab in right panel
- View tools in grid or list
- Click tool to record usage
- Filter by category

### 4. Manage Memory
- Click **"Memory"** tab
- View short-term/long-term/episodic memories
- Search memories by keyword
- Delete old memories

### 5. Configure Permissions
- Click **"Permissions"** tab
- Select active profile
- Enable/disable rules
- Create new profiles

### 6. Adjust Settings
- Click **"Settings"** button (bottom left)
- Customize theme, language, voice
- Configure notifications
- Set AI provider

## 🔄 State Management

All data is managed by **Zustand stores** (in-memory):

```typescript
// Conversation management
const { addMessage, conversations } = useConversationStore()

// Tool registry
const { getAvailableTools } = useToolRegistry()

// Memory operations
const { addMemory, searchMemory } = useMemoryStore()

// Activity tracking
const { startActivity, completeActivity } = useActivityStore()

// Permissions
const { hasPermission } = usePermissionsStore()

// Settings
const { settings, updateTheme } = useSettingsStore()
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  apex: {
    accent: '#00ff00',  // Change from cyan to green
    dark: '#000000',    // Change background
  }
}
```

### Add New Tools
Edit `lib/stores/toolRegistry.ts`:
```typescript
const DEFAULT_TOOLS: Tool[] = [
  {
    id: 'my-tool',
    name: 'My Tool',
    description: 'What it does',
    category: 'development',
    status: 'available',
    icon: '🛠️',
  },
  // ... more tools
]
```

### Modify UI
Edit components in `components/` folder:
- Change colors in className
- Adjust layout with flex/grid
- Add new UI elements

## 🚀 Build for Production

```bash
# Build
npm run build

# Start production server
npm start

# Output will be in .next/ folder
```

Deploy to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **Any Node.js hosting**

## 🔧 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Dependencies issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
npm run type-check
```

### Build errors
```bash
npm run build
# Check .next/static folder
```

## 📚 Project Files

| File | Purpose |
|------|----------|
| `app/layout.tsx` | Root HTML layout |
| `app/page.tsx` | Main app entry point |
| `app/globals.css` | Global styles |
| `components/*` | React components |
| `lib/types.ts` | TypeScript types |
| `lib/stores/*` | Zustand state stores |
| `tailwind.config.ts` | Tailwind settings |
| `package.json` | Dependencies list |
| `tsconfig.json` | TypeScript config |
| `next.config.js` | Next.js config |

## 🎯 Next Steps

### Phase 2 - Add AI
1. Get API key from OpenAI/Gemini
2. Create `lib/ai.ts` with API calls
3. Connect chat to AI responses
4. Add streaming responses

### Phase 3 - Add Voice
1. Use Web Speech API
2. Record audio input
3. Send to speech-to-text service
4. Get text-to-speech output

### Phase 4 - Add Database
1. Setup Supabase/Firebase
2. Persist conversations
3. Save memories
4. Store settings

## 💡 Tips

- Use browser DevTools to inspect state
- Check console for errors
- Use React DevTools extension
- Test on mobile with Chrome DevTools
- Start with Phase 1, extend gradually

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Docs](https://zustand-demo.vercel.app)

---

**Ready to build? Let's go! 🚀**
