import { create } from 'zustand'
import { PermissionsProfile, PermissionRule, PermissionScope, Permission } from '@/lib/types'

interface PermissionsStore {
  profiles: PermissionsProfile[]
  activeProfileId: string | null
  
  // Profile management
  createProfile: (name: string, description?: string) => PermissionsProfile
  deleteProfile: (id: string) => void
  updateProfile: (id: string, updates: Partial<PermissionsProfile>) => void
  setActiveProfile: (id: string) => void
  getActiveProfile: () => PermissionsProfile | null
  
  // Rule management
  addRule: (profileId: string, rule: PermissionRule) => void
  updateRule: (profileId: string, ruleId: string, updates: Partial<PermissionRule>) => void
  deleteRule: (profileId: string, ruleId: string) => void
  
  // Permission checking
  hasPermission: (scope: PermissionScope, permission: Permission) => boolean
}

const generateId = () => `perm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
const generateRuleId = () => `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Default permission profile (User)
const DEFAULT_PROFILE: PermissionsProfile = {
  id: generateId(),
  name: 'User',
  description: 'Default user permissions',
  rules: [
    {
      id: generateRuleId(),
      scope: 'memory',
      permissions: ['read', 'write'],
      isAllowed: true,
      description: 'Can read and write memory',
    },
    {
      id: generateRuleId(),
      scope: 'tools',
      permissions: ['read', 'execute'],
      isAllowed: true,
      description: 'Can use available tools',
    },
    {
      id: generateRuleId(),
      scope: 'files',
      permissions: ['read', 'write'],
      isAllowed: true,
      description: 'Can read and write files',
    },
    {
      id: generateRuleId(),
      scope: 'settings',
      permissions: ['read', 'write'],
      isAllowed: true,
      description: 'Can modify settings',
    },
    {
      id: generateRuleId(),
      scope: 'system',
      permissions: ['read'],
      isAllowed: true,
      description: 'Can view system information',
    },
  ],
  createdAt: Date.now(),
}

export const usePermissionsStore = create<PermissionsStore>((set, get) => ({
  profiles: [DEFAULT_PROFILE],
  activeProfileId: DEFAULT_PROFILE.id,

  createProfile: (name, description) => {
    const profile: PermissionsProfile = {
      id: generateId(),
      name,
      description,
      rules: [],
      createdAt: Date.now(),
    }
    set((state) => ({
      profiles: [...state.profiles, profile],
    }))
    return profile
  },

  deleteProfile: (id) =>
    set((state) => ({
      profiles: state.profiles.filter((p) => p.id !== id),
      activeProfileId: state.activeProfileId === id ? null : state.activeProfileId,
    })),

  updateProfile: (id, updates) =>
    set((state) => ({
      profiles: state.profiles.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  setActiveProfile: (id) =>
    set({ activeProfileId: id }),

  getActiveProfile: () => {
    const state = get()
    return state.profiles.find((p) => p.id === state.activeProfileId) || null
  },

  addRule: (profileId, rule) =>
    set((state) => ({
      profiles: state.profiles.map((p) =>
        p.id === profileId
          ? { ...p, rules: [...p.rules, rule] }
          : p
      ),
    })),

  updateRule: (profileId, ruleId, updates) =>
    set((state) => ({
      profiles: state.profiles.map((p) =>
        p.id === profileId
          ? {
              ...p,
              rules: p.rules.map((r) =>
                r.id === ruleId ? { ...r, ...updates } : r
              ),
            }
          : p
      ),
    })),

  deleteRule: (profileId, ruleId) =>
    set((state) => ({
      profiles: state.profiles.map((p) =>
        p.id === profileId
          ? {
              ...p,
              rules: p.rules.filter((r) => r.id !== ruleId),
            }
          : p
      ),
    })),

  hasPermission: (scope, permission) => {
    const state = get()
    const activeProfile = state.profiles.find((p) => p.id === state.activeProfileId)
    if (!activeProfile) return false
    
    const rule = activeProfile.rules.find((r) => r.scope === scope)
    if (!rule) return false
    
    return rule.isAllowed && rule.permissions.includes(permission)
  },
}))
