import React from 'react';
import { BarChart3, TrendingUp, BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';
import { getLibraryStats, mockBooks, mockTransactions } from '../data/mockData';

const Analytics: React.FC = () => {
  const stats = getLibraryStats();

  const categoryData = mockBooks.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + book.totalCopies;
    return acc;
  }, {} as Record<string, number>);

  const maxCategoryCount = Math.max(...Object.values(categoryData));

  const monthlyData = [
    { month: 'Jan', checkouts: 45, returns: 42 },
    { month: 'Feb', checkouts: 52, returns: 48 },
    { month: 'Mar', checkouts: 38, returns: 35 },
    { month: 'Apr', checkouts: 61, returns: 58 },
    { month: 'May', checkouts: 49, returns: 46 },
    { month: 'Jun', checkouts: 55, returns: 52 }
  ];

  const maxMonthlyValue = Math.max(...monthlyData.flatMap(d => [d.checkouts, d.returns]));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Library Analytics</h1>
        <p className="text-gray-600">Insights and statistics about library operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Books</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +5% from last month
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Checked Out</p>
              <p className="text-3xl font-bold text-gray-900">{stats.booksCheckedOut}</p>
              <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                Current active loans
              </p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Overdue</p>
              <p className="text-3xl font-bold text-gray-900">{stats.overdueBooks}</p>
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" />
                Requires attention
              </p>
            </div>
            <div className="p-3 bg-red-500 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Books by Category
          </h3>
          <div className="space-y-4">
            {Object.entries(categoryData).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{category}</span>
                  <span className="font-medium text-gray-900">{count} books</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Activity
          </h3>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-8 text-sm font-medium text-gray-700">{data.month}</div>
                <div className="flex-1">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Checkouts: {data.checkouts}</span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${(data.checkouts / maxMonthlyValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2 items-center mb-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Returns: {data.returns}</span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${(data.returns / maxMonthlyValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;