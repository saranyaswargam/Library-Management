export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  membershipDate: string;
  status: 'active' | 'suspended';
  address: string;
}

export interface Transaction {
  id: string;
  bookId: string;
  userId: string;
  bookTitle: string;
  userName: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  fineAmount: number;
}

export interface LibraryStats {
  totalBooks: number;
  totalUsers: number;
  booksCheckedOut: number;
  overdueBooks: number;
}