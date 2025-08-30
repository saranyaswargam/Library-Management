import { Book, User, Transaction } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    publicationYear: 1925,
    totalCopies: 5,
    availableCopies: 3,
    description: 'A classic American novel about the Jazz Age and the American Dream.'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    publicationYear: 1960,
    totalCopies: 4,
    availableCopies: 2,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.'
  },
  {
    id: '3',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0-262-03384-8',
    category: 'Computer Science',
    publicationYear: 2009,
    totalCopies: 3,
    availableCopies: 1,
    description: 'Comprehensive introduction to algorithms and data structures.'
  },
  {
    id: '4',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    category: 'Computer Science',
    publicationYear: 2008,
    totalCopies: 6,
    availableCopies: 4,
    description: 'A handbook of agile software craftsmanship.'
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    category: 'Classic Literature',
    publicationYear: 1813,
    totalCopies: 3,
    availableCopies: 3,
    description: 'A romantic novel about manners, upbringing, morality, and marriage.'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phoneNumber: '(555) 123-4567',
    membershipDate: '2023-01-15',
    status: 'active',
    address: '123 Main St, City, State 12345'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    phoneNumber: '(555) 987-6543',
    membershipDate: '2023-03-22',
    status: 'active',
    address: '456 Oak Ave, City, State 12345'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phoneNumber: '(555) 555-0123',
    membershipDate: '2022-11-08',
    status: 'suspended',
    address: '789 Pine Rd, City, State 12345'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    bookId: '1',
    userId: '1',
    bookTitle: 'The Great Gatsby',
    userName: 'John Smith',
    checkoutDate: '2024-01-10',
    dueDate: '2024-01-24',
    status: 'borrowed',
    fineAmount: 0
  },
  {
    id: '2',
    bookId: '2',
    userId: '2',
    bookTitle: 'To Kill a Mockingbird',
    userName: 'Emily Johnson',
    checkoutDate: '2024-01-05',
    dueDate: '2024-01-19',
    returnDate: '2024-01-18',
    status: 'returned',
    fineAmount: 0
  },
  {
    id: '3',
    bookId: '3',
    userId: '3',
    bookTitle: 'Introduction to Algorithms',
    userName: 'Michael Brown',
    checkoutDate: '2023-12-20',
    dueDate: '2024-01-03',
    status: 'overdue',
    fineAmount: 15.50
  }
];

export const getLibraryStats = (): any => {
  const totalBooks = mockBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const booksCheckedOut = mockTransactions.filter(t => t.status === 'borrowed').length;
  const overdueBooks = mockTransactions.filter(t => t.status === 'overdue').length;
  
  return {
    totalBooks,
    totalUsers: mockUsers.length,
    booksCheckedOut,
    overdueBooks
  };
};