import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

// User-only filters
const filters = [
  "My tickets",
  "Open",
  "Pending",
  "Solved",
  "Closed",
];

// Example: Only user's own tickets
const tickets = [
  {
    id: 1,
    requester: "Lisa Goodman",
    email: "lisagoodman@mail.com",
    subject: "Shoe size question",
    description: "I need help with shoe sizing.",
    status: "Open",
    priority: "High",
    lastMessage: "4 seconds ago",
    createdAt: "2025-06-01",
  },
  {
    id: 2,
    requester: "Lisa Goodman",
    email: "lisagoodman@mail.com",
    subject: "Order #345098",
    description: "Question about my recent order.",
    status: "Pending",
    priority: "Medium",
    lastMessage: "45 seconds ago",
    createdAt: "2025-05-29",
  },
  {
    id: 3,
    requester: "Lisa Goodman",
    email: "lisagoodman@mail.com",
    subject: "Happy feedback 😊",
    description: "Just wanted to say thanks!",
    status: "Solved",
    priority: "Low",
    lastMessage: "2 hours ago",
    createdAt: "2025-05-20",
  },
  // Add more tickets as needed...
];

function statusColor(status) {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-700";
    case "Solved":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-gray-100 text-gray-700 border border-gray-300";
    case "Closed":
      return "bg-gray-300 text-gray-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function priorityColor(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ViewTicketsPage() {
  const [selectedFilter, setSelectedFilter] = useState("My tickets");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filter tickets by status, search, and date range
  const filteredTickets = tickets.filter((t) => {
    const matchesStatus =
      selectedFilter === "My tickets" ? true : t.status === selectedFilter;
    const matchesSearch =
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const ticketDate = t.createdAt;
    const afterFrom = !dateFrom || ticketDate >= dateFrom;
    const beforeTo = !dateTo || ticketDate <= dateTo;
    return matchesStatus && matchesSearch && afterFrom && beforeTo;
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-bold text-green-600">Tickets</span>
          <Link to="/create-ticket">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
              + New ticket
            </Button>
          </Link>
        </div>
        <div className="p-6">
          <input
            type="text"
            placeholder="Search in my tickets..."
            className="w-full px-3 py-2 mb-4 border rounded bg-gray-50 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {/* Date Range Filter */}
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-xs font-semibold text-green-700">Date Range</label>
            <input
              type="date"
              className="border rounded px-2 py-1 text-sm"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              placeholder="From"
            />
            <input
              type="date"
              className="border rounded px-2 py-1 text-sm"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              placeholder="To"
            />
          </div>
          <nav className="flex flex-col gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`text-left px-2 py-1 rounded font-medium ${
                  selectedFilter === filter
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedFilter === "My tickets" ? "My tickets" : `${selectedFilter} tickets`}
          </h1>
          <Link to="/">
            <Button className="text-green-700 hover:underline font-semibold bg-transparent shadow-none">
              &larr; Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Last Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/ticket/${ticket.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ticket.subject}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">{ticket.lastMessage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}