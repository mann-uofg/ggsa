export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  price: number;
  image: string;
  availableTickets: number;
}

export interface CommitteeMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  quantity: number;
  price: number;
  email: string;
  name: string;
  purchaseDate: Date;
}