'use client'

import React from 'react'
import { Activity, Check, AlertCircle, Loader2 } from 'lucide-react'
import { useActivityStore } from '@/lib/stores/activityStore'
import { ActivityStatus } from '@/lib/types'

interface ActivityPanelProps {
  maxHeight?: string
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ maxHeight = 'max-h-64' }) => {
  const { activities, clearCompletedActivities } = useActivityStore()
  const activeActivities = activities.filter((a) => a.status !== 'complete' && a.status !== 'error')

  const getStatusIcon = (status: ActivityStatus) => {
    switch (status) {
      case 'complete':
        return <Check className="w-4 h-4 text-apex-success" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-apex-danger" />
      case 'thinking':
      case 'planning':
      case 'executing':
        return <Loader2 className="w-4 h-4 text-apex-accent animate-spin" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: ActivityStatus): string => {
    switch (status) {
      case 'thinking':
        return 'text-blue-400'
      case 'planning':
        return 'text-purple-400'
      case 'executing':
        return 'text-yellow-400'
      case 'complete':
        return 'text-apex-success'
      case 'error':
        return 'text-apex-danger'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className={`${maxHeight} bg-apex-border/30 border border-apex-border rounded-lg overflow-hidden flex flex-col`}>
      <div className="px-4 py-3 border-b border-apex-border/50 flex items-center justify-between bg-apex-dark/50">
        <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
          <Activity className="w-4 h-4 text-apex-accent" />
          <span>Live Activity</span>
        </h3>
        {activities.some((a) => a.status === 'complete' || a.status === 'error') && (
          <button
            onClick={clearCompletedActivities}
            className="text-xs text-gray-400 hover:text-apex-accent transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            <p>No activities</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="bg-apex-dark/50 rounded p-2 text-xs">
              <div className="flex items-start space-x-2">
                {getStatusIcon(activity.status)}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </p>
                  <p className="text-gray-300 truncate">{activity.title}</p>
                  {activity.description && (
                    <p className="text-gray-400 text-xs truncate mt-1">{activity.description}</p>
                  )}
                </div>
              </div>
              {activity.status !== 'complete' && activity.status !== 'error' && (
                <div className="mt-2 bg-apex-border rounded-full h-1">
                  <div
                    className="bg-apex-accent h-1 rounded-full transition-all duration-300"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ActivityPanel
