import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { SubscriptionStatus } from '../components/SubscriptionStatus'
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'

export function Dashboard() {
  const { user, signOut } = useAuth()

  const stats = [
    { name: 'Cours suivis', value: '12', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Heures d\'apprentissage', value: '48h', icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Badges obtenus', value: '8', icon: Award, color: 'bg-yellow-500' },
    { name: 'Amis connectés', value: '23', icon: Users, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-sm text-gray-600">Bienvenue, {user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <SubscriptionStatus />
              <button
                onClick={signOut}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} rounded-md p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cours récents
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Mathématiques - Algèbre', progress: 75 },
                { title: 'Français - Grammaire', progress: 60 },
                { title: 'Sciences - Physique', progress: 90 },
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{course.title}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Activité récente
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Cours terminé', subject: 'Mathématiques - Chapitre 5', time: 'Il y a 2 heures' },
                { action: 'Badge obtenu', subject: 'Expert en grammaire', time: 'Il y a 1 jour' },
                { action: 'Quiz réussi', subject: 'Sciences - Test final', time: 'Il y a 2 jours' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}:</span> {activity.subject}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}