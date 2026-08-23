'use client'

import React, { useState } from 'react'
import { Shield, Plus, Trash2, Toggle2 } from 'lucide-react'
import { usePermissionsStore } from '@/lib/stores/permissionsStore'
import { PermissionScope } from '@/lib/types'

const PermissionsCenter: React.FC = () => {
  const {
    profiles,
    activeProfileId,
    setActiveProfile,
    createProfile,
    deleteProfile,
    addRule,
    updateRule,
    deleteRule,
  } = usePermissionsStore()

  const [newProfileName, setNewProfileName] = useState('')
  const [showNewProfile, setShowNewProfile] = useState(false)

  const activeProfile = profiles.find((p) => p.id === activeProfileId)

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      createProfile(newProfileName)
      setNewProfileName('')
      setShowNewProfile(false)
    }
  }

  return (
    <div className="bg-apex-dark rounded-lg border border-apex-border flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-apex-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Shield className="w-5 h-5 text-apex-accent" />
            <span>Permissions</span>
          </h2>
          <button
            onClick={() => setShowNewProfile(!showNewProfile)}
            className="p-2 hover:bg-apex-border rounded transition-colors"
            title="Create new profile"
          >
            <Plus className="w-5 h-5 text-apex-accent" />
          </button>
        </div>

        {/* New Profile Input */}
        {showNewProfile && (
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Profile name"
              className="flex-1 bg-apex-border border border-apex-border/50 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-apex-accent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateProfile()
              }}
            />
            <button
              onClick={handleCreateProfile}
              className="px-3 py-2 bg-apex-accent hover:bg-apex-accentDim text-apex-dark font-medium rounded text-sm transition-colors"
            >
              Create
            </button>
          </div>
        )}

        {/* Profile Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase">Active Profile</label>
          <select
            value={activeProfileId || ''}
            onChange={(e) => setActiveProfile(e.target.value)}
            className="w-full bg-apex-border border border-apex-border/50 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-apex-accent"
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rules List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!activeProfile ? (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No profile selected</p>
          </div>
        ) : activeProfile.rules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No rules defined</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeProfile.rules.map((rule) => (
              <div key={rule.id} className="p-3 bg-apex-border/50 rounded-lg border border-apex-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-white capitalize">{rule.scope}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {rule.permissions.join(', ')}
                    </p>
                    {rule.description && (
                      <p className="text-xs text-gray-500 mt-2">{rule.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    <Toggle2
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        rule.isAllowed ? 'text-apex-success' : 'text-apex-danger'
                      }`}
                      onClick={() =>
                        updateRule(activeProfile.id, rule.id, { isAllowed: !rule.isAllowed })
                      }
                    />
                    <button
                      onClick={() => deleteRule(activeProfile.id, rule.id)}
                      className="p-1 hover:bg-apex-border rounded transition-colors"
                      title="Delete rule"
                    >
                      <Trash2 className="w-4 h-4 text-apex-danger hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PermissionsCenter
