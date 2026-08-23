import { create } from 'zustand'
import { ApexSettings, AIProviderConfig } from '@/lib/types'

interface SettingsStore {
  settings: ApexSettings
  
  // General settings
  updateTheme: (theme: 'dark' | 'light' | 'auto') => void
  updateLanguage: (language: string) => void
  
  // Voice settings
  updateVoiceSettings: (voiceSettings: Partial<ApexSettings['voice']>) => void
  
  // Notification settings
  updateNotificationSettings: (notificationSettings: Partial<ApexSettings['notifications']>) => void
  
  // Privacy settings
  updatePrivacySettings: (privacySettings: Partial<ApexSettings['privacy']>) => void
  
  // AI Provider settings
  updateAIProvider: (config: AIProviderConfig) => void
  
  // Get all settings
  getSettings: () => ApexSettings
}

const DEFAULT_SETTINGS: ApexSettings = {
  theme: 'dark',
  language: 'en',
  voice: {
    enabled: false,
    language: 'en-US',
    rate: 1,
    pitch: 1,
  },
  notifications: {
    enabled: true,
    sound: true,
    desktop: true,
  },
  privacy: {
    storeHistory: true,
    allowAnalytics: false,
    dataRetention: '90days',
  },
  ai: {
    provider: 'local',
    model: 'local-model',
  },
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,

  updateTheme: (theme) =>
    set((state) => ({
      settings: { ...state.settings, theme },
    })),

  updateLanguage: (language) =>
    set((state) => ({
      settings: { ...state.settings, language },
    })),

  updateVoiceSettings: (voiceSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        voice: { ...state.settings.voice, ...voiceSettings },
      },
    })),

  updateNotificationSettings: (notificationSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        notifications: { ...state.settings.notifications, ...notificationSettings },
      },
    })),

  updatePrivacySettings: (privacySettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        privacy: { ...state.settings.privacy, ...privacySettings },
      },
    })),

  updateAIProvider: (config) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ai: config,
      },
    })),

  getSettings: () => get().settings,
}))
