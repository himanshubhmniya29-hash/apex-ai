import { create } from 'zustand'
import { Activity, ActivityStatus, ActivityType } from '@/lib/types'

interface ActivityStore {
  activities: Activity[]
  maxActivities: number
  
  // Activity management
  startActivity: (type: ActivityType, title: string, description?: string) => Activity
  updateActivityStatus: (id: string, status: ActivityStatus) => void
  updateActivityProgress: (id: string, progress: number) => void
  completeActivity: (id: string, result?: unknown) => void
  failActivity: (id: string, error: string) => void
  deleteActivity: (id: string) => void
  getActivity: (id: string) => Activity | null
  getActiveActivities: () => Activity[]
  clearCompletedActivities: () => void
}

const generateId = () => `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: [],
  maxActivities: 50,

  startActivity: (type, title, description) => {
    const activity: Activity = {
      id: generateId(),
      type,
      title,
      description,
      status: 'thinking',
      progress: 0,
      startTime: Date.now(),
    }
    
    set((state) => ({
      activities: [activity, ...state.activities].slice(0, state.maxActivities),
    }))
    
    return activity
  },

  updateActivityStatus: (id, status) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    })),

  updateActivityProgress: (id, progress) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, progress: Math.min(progress, 100) } : a
      ),
    })),

  completeActivity: (id, result) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'complete',
              progress: 100,
              endTime: Date.now(),
              result,
            }
          : a
      ),
    })),

  failActivity: (id, error) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'error',
              endTime: Date.now(),
              error,
            }
          : a
      ),
    })),

  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== id),
    })),

  getActivity: (id) => {
    const state = get()
    return state.activities.find((a) => a.id === id) || null
  },

  getActiveActivities: () => {
    const state = get()
    return state.activities.filter((a) => a.status !== 'complete' && a.status !== 'error')
  },

  clearCompletedActivities: () =>
    set((state) => ({
      activities: state.activities.filter(
        (a) => a.status !== 'complete' && a.status !== 'error'
      ),
    })),
}))
