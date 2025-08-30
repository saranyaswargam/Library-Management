import React from 'react';
import { BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';
import { getLibraryStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = getLibraryStats();

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Books Checked Out',
      value: stats.booksCheckedOut,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Overdue Books',
      value: stats.overdueBooks,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Library Dashboard</h1>
        <p className="text-gray-600">Welcome to the Library Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 ${card.color} rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New book added: "Clean Code"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Book returned: "The Great Gatsby"</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user registered: Emily Johnson</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-blue-700">Add Book</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-green-700">Add User</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors duration-200">
              <Clock className="w-6 h-6 text-yellow-600 mb-2" />
              <p className="text-sm font-medium text-yellow-700">Check Out</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors duration-200">
              <AlertTriangle className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-purple-700">View Overdue</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;