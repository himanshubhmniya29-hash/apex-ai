# APEX JARVIS - Ultimate Personal AI Assistant

🤖 **APEX JARVIS** is a next-generation personal AI assistant inspired by Iron Man's JARVIS, built with modern web technologies and featuring a premium interface with cybersecurity capabilities.

## ✨ Features (Phase 1)

### Core Components
- 💬 **Premium Chat Interface** - JARVIS-style conversation with real-time message streaming
- 🧠 **Memory System** - Short-term, long-term, and episodic memory management
- ⚡ **Tool Registry** - 30+ pre-configured tools across 6 categories
- 🔐 **Permissions Center** - Role-based access control with custom profiles
- ⚙️ **Settings Panel** - Comprehensive configuration options
- 📊 **Live Activity Panel** - Real-time monitoring of AI operations
- 🎨 **Dark Theme UI** - Cyberpunk-inspired design with cyan accents

### Tool Categories
1. **Cybersecurity** - Port scanning, dependency auditing, vulnerability assessment
2. **Productivity** - Memory search, task management, information retrieval
3. **Development** - Code analysis, execution, documentation generation
4. **Automation** - Task scheduling, workflow automation, API integration
5. **Analysis** - Data visualization, pattern recognition, report generation
6. **Utility** - System utilities, file operations, miscellaneous tools

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS animations
- **State Management**: Zustand (lightweight & fast)
- **UI Components**: Lucide React Icons
- **Architecture**: Modular component-based design

## 📁 Project Structure

```
apex-ai/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main application entry
│   └── globals.css          # Global styles & animations
├── components/
│   ├── MainLayout.tsx       # Layout orchestrator
│   ├── ChatInterface.tsx     # Chat/conversation UI
│   ├── MessageBubble.tsx     # Message display component
│   ├── InputArea.tsx         # Message input with voice button
│   ├── Sidebar.tsx           # Conversation list & navigation
│   ├── ConversationList.tsx  # Scrollable conversation list
│   ├── RightPanel.tsx        # Tab-based right sidebar
│   ├── ActivityPanel.tsx     # Live activity monitoring
│   ├── ToolPanel.tsx         # Tool registry & browser
│   ├── PermissionsCenter.tsx # Role-based permissions UI
│   ├── MemoryPanel.tsx       # Memory management interface
│   └── SettingsPanel.tsx     # Configuration modal
├── lib/
│   ├── types.ts              # Complete TypeScript interfaces
│   └── stores/
│       ├── conversationStore.ts  # Zustand conversation store
│       ├── toolRegistry.ts       # Tool management store
│       ├── memoryStore.ts        # Memory system store
│       ├── activityStore.ts      # Activity tracking store
│       ├── permissionsStore.ts   # Permissions management
│       └── settingsStore.ts      # Application settings
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── postcss.config.js         # PostCSS configuration
├── .eslintrc.json            # ESLint configuration
└── package.json              # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:himanshubhmniya29-hash/apex-ai.git
   cd apex-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Quality checks
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checker
```

## 🏗️ Phase 1 Features

### ✅ Completed
- [x] Complete project setup (Next.js, TypeScript, Tailwind)
- [x] Premium UI with APEX theme (cyan/dark)
- [x] Zustand state management stores
- [x] Complete type definitions
- [x] Chat interface with message history
- [x] Conversation management system
- [x] Tool registry with 6 categories
- [x] Memory system (3 types)
- [x] Activity tracking panel
- [x] Permissions/roles system
- [x] Settings configuration
- [x] Responsive design (mobile + desktop)
- [x] Dark theme with animations
- [x] Voice input button (placeholder)
- [x] Message copy functionality

### 🔜 Upcoming (Phase 2+)
- [ ] AI Integration (Gemini/OpenAI API)
- [ ] Real voice input/output (Web Speech API)
- [ ] Persistent storage (Supabase/Firebase)
- [ ] Android integration
- [ ] Real tool execution
- [ ] Vision/screenshot capabilities
- [ ] Web research agent
- [ ] Always-on voice activation
- [ ] Self-improvement system

## 🎨 UI Components Overview

### MainLayout
Root component that orchestrates the entire application layout with three main sections.

### ChatInterface
- Message display area with auto-scroll
- Real-time message rendering
- Loading states with animated indicators
- Empty state messaging

### Sidebar
- "New Chat" button
- Search conversations
- Conversation list with delete option
- Archived conversations toggle
- Settings button

### RightPanel
Tabbed interface with 4 panels:
1. **Activity Panel** - Live processing status
2. **Tool Panel** - Tool browser (grid/list view)
3. **Permissions Panel** - Role management
4. **Memory Panel** - Memory browser

### InputArea
- Textarea with Shift+Enter for new lines
- Voice input button
- File attachment button
- Send button with disabled state

## 🧠 State Management (Zustand)

### Stores
1. **conversationStore** - Conversation & message management
2. **toolRegistry** - Tool registration & usage tracking
3. **memoryStore** - Three-type memory system
4. **activityStore** - Activity lifecycle management
5. **permissionsStore** - Permission profiles & rules
6. **settingsStore** - Application settings

## 🎨 Design System

### Color Palette
- **Primary**: #00d4ff (Cyan accent)
- **Dark**: #0a0e27 (Dark background)
- **Darker**: #050812 (Darkest background)
- **Border**: #1a1f3a (Border color)
- **Success**: #00ff41 (Green)
- **Warning**: #ffaa00 (Orange)
- **Danger**: #ff4444 (Red)

### Typography
- Font Family: Fira Code (monospace)
- Smooth animations with cubic-bezier timing
- Glow effects for interactive elements

## 🔐 Security & Privacy

- ✅ Client-side state management (no server data storage in Phase 1)
- ✅ TypeScript for type safety
- ✅ No external API calls (placeholder responses)
- ✅ Role-based permissions system
- ✅ Private conversation storage

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📄 License

MIT License - Use freely for personal projects

## 🚀 Roadmap

### Phase 1 ✅ COMPLETED
- Core UI & state management
- Tool registry system
- Memory management
- Permissions system
- Complete documentation

### Phase 2 (Next)
- AI Integration (LLM API - Gemini/OpenAI)
- Real tool execution backend
- Persistent storage (Supabase/Firebase)
- Voice I/O (Web Speech API)
- API routes for AI responses

### Phase 3
- Android agent integration
- System integration APIs
- Advanced automation workflows
- Custom plugin system

### Phase 4+
- Self-learning capabilities
- Computer vision integration
- Autonomous task execution
- Multi-device sync
- Always-on voice activation

## 📞 Support

For issues or questions, open a GitHub issue.

---

**Made with ❤️ by Himanshu**

*Status: Active Development - Phase 1 Complete*

**Next Steps:**
1. `npm install && npm run dev`
2. Open http://localhost:3000
3. Start chatting with APEX!
