import React, { useState } from 'react';
import { Search, Plus, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Transaction } from '../types';
import { mockTransactions, mockBooks, mockUsers } from '../data/mockData';

const TransactionManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const bookId = formData.get('bookId') as string;
    const userId = formData.get('userId') as string;
    
    const book = mockBooks.find(b => b.id === bookId);
    const user = mockUsers.find(u => u.id === userId);
    
    if (book && user && book.availableCopies > 0) {
      const checkoutDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14); // 2 weeks checkout period

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        bookId,
        userId,
        bookTitle: book.title,
        userName: user.name,
        checkoutDate: checkoutDate.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'borrowed',
        fineAmount: 0
      };

      setTransactions([newTransaction, ...transactions]);
      setShowCheckoutForm(false);
    }
  };

  const handleReturn = (transactionId: string) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === transactionId
        ? {
            ...transaction,
            returnDate: new Date().toISOString().split('T')[0],
            status: 'returned' as const
          }
        : transaction
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'borrowed':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'returned':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'borrowed':
        return 'bg-yellow-100 text-yellow-700';
      case 'returned':
        return 'bg-green-100 text-green-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Management</h1>
          <p className="text-gray-600">Track book checkouts, returns, and overdue items</p>
        </div>
        <button
          onClick={() => setShowCheckoutForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Checkout
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by book title or user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book & User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.bookTitle}</div>
                      <div className="text-sm text-gray-500">{transaction.userName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        Out: {new Date(transaction.checkoutDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(transaction.dueDate).toLocaleDateString()}
                      </div>
                      {transaction.returnDate && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Returned: {new Date(transaction.returnDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${transaction.fineAmount > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      ${transaction.fineAmount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.status === 'borrowed' && (
                      <button
                        onClick={() => handleReturn(transaction.id)}
                        className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors duration-200"
                      >
                        Return Book
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">New Book Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Book</label>
                <select
                  name="bookId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a book</option>
                  {mockBooks.filter(book => book.availableCopies > 0).map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.author} (Available: {book.availableCopies})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                <select
                  name="userId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a user</option>
                  {mockUsers.filter(user => user.status === 'active').map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Checkout Book
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManager;