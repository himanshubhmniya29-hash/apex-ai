'use client'

import React, { useState } from 'react'
import { Settings, X } from 'lucide-react'
import { useSettingsStore } from '@/lib/stores/settingsStore'

interface SettingsPanelProps {
  onClose: () => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { settings, updateTheme, updateLanguage, updateVoiceSettings, updateNotificationSettings } =
    useSettingsStore()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-apex-dark border border-apex-border rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-apex-border flex items-center justify-between sticky top-0 bg-apex-dark">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Settings className="w-5 h-5 text-apex-accent" />
            <span>Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-apex-border rounded-lg transition-colors"
            title="Close settings"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="px-6 py-4 space-y-6">
          {/* General Settings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase mb-4">General</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => updateTheme(e.target.value as any)}
                  className="w-full bg-apex-border border border-apex-border/50 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-apex-accent"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => updateLanguage(e.target.value)}
                  className="w-full bg-apex-border border border-apex-border/50 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-apex-accent"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          {/* Voice Settings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase mb-4">Voice</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.voice.enabled}
                  onChange={(e) => updateVoiceSettings({ enabled: e.target.checked })}
                  className="w-4 h-4 rounded bg-apex-border border-apex-border/50 text-apex-accent focus:ring-2 focus:ring-apex-accent cursor-pointer"
                />
                <span className="text-sm text-gray-300">Enable voice input/output</span>
              </label>
              {settings.voice.enabled && (
                <>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Speed</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={settings.voice.rate}
                      onChange={(e) => updateVoiceSettings({ rate: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase mb-4">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.notifications.enabled}
                  onChange={(e) => updateNotificationSettings({ enabled: e.target.checked })}
                  className="w-4 h-4 rounded bg-apex-border border-apex-border/50 text-apex-accent focus:ring-2 focus:ring-apex-accent cursor-pointer"
                />
                <span className="text-sm text-gray-300">Enable notifications</span>
              </label>
              {settings.notifications.enabled && (
                <>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.notifications.sound}
                      onChange={(e) =>
                        updateNotificationSettings({ sound: e.target.checked })
                      }
                      className="w-4 h-4 rounded bg-apex-border border-apex-border/50 text-apex-accent focus:ring-2 focus:ring-apex-accent cursor-pointer"
                    />
                    <span className="text-sm text-gray-300">Sound</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.notifications.desktop}
                      onChange={(e) =>
                        updateNotificationSettings({ desktop: e.target.checked })
                      }
                      className="w-4 h-4 rounded bg-apex-border border-apex-border/50 text-apex-accent focus:ring-2 focus:ring-apex-accent cursor-pointer"
                    />
                    <span className="text-sm text-gray-300">Desktop notifications</span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* About */}
          <div className="pt-4 border-t border-apex-border">
            <div className="text-xs text-gray-500 space-y-1">
              <p>APEX JARVIS v0.1.0</p>
              <p>© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
