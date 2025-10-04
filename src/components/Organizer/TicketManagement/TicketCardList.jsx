import React from 'react';

const expectedTicketsData = [
  {
    category: "Concert",
    tickets: [
      {
        type: "VIP",
        price: 300,
        available: 5,
        sold: 2,
        remaining: 3,
      },
      {
        type: "Regular",
        price: 150,
        available: 10,
        sold: 6,
        remaining: 4,
      },
    ],
  },
  {
    category: "Conference",
    tickets: [
      {
        type: "Early-bird",
        price: 100,
        available: 20,
        sold: 12,
        remaining: 8,
      },
      {
        type: "Regular",
        price: 200,
        available: 15,
        sold: 7,
        remaining: 8,
      },
      {
        type: "Vip",
        price: 999,
        available: 15,
        sold: 9,
        remaining: 6,
      },
    ],
  },
];

const TicketCardList = () => {
  return (
    <div className="p-6 space-y-8">
      {expectedTicketsData.map((categoryData, catIndex) => (
        <div key={catIndex}>
          {/* Category Header */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {categoryData.category}
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.tickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-5 relative overflow-hidden"
              >
                {/* Top decorative line for ticket vibe */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg"></div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ticket.type} Ticket</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">Price: ${ticket.price}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">Available: {ticket.available}</p>
                <p className="text-orange-500 dark:text-orange-400 mb-1 font-semibold">Sold: {ticket.sold}</p>
                <p className="text-green-600 dark:text-green-400 font-semibold">Remaining: {ticket.remaining}</p>

                {/* Bottom decorative perforation line for ticket vibe */}
                <div className="absolute bottom-0 left-0 w-full h-2 border-t-2 border-dashed border-gray-300 dark:border-gray-600"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketCardList;
