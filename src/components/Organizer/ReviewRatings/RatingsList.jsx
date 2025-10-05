"use client";

const reviewsData = [
  {
    id: 1,
    eventName: "Summer Music Festival",
    userName: "John Doe",
    rating: 5,
    comment: "Amazing event! The atmosphere and performances were outstanding!",
    date: "2025-09-10",
    status: "Published",
  },
  {
    id: 2,
    eventName: "Tech Innovators Summit",
    userName: "Jane Smith",
    rating: 4,
    comment:
      "Great content and insightful speakers. The only issue was limited seating.",
    date: "2025-09-15",
    status: "Published",
  },
  {
    id: 3,
    eventName: "Startup Expo 2025",
    userName: "Michael Johnson",
    rating: 2,
    comment:
      "The event was poorly organized and started late. Needs improvement.",
    date: "2025-09-20",
    status: "Flagged",
  },
];

const RatingsList = () => {
  const handleFlag = (id) => {
    console.log(id);
  };

  const handleRespond = (id) => {
    console.log(id);
  };

  return (
    <div className="xl:p-6 rounded-lg  w-full mt-10">
      {/* TABLE VIEW for XL screens */}
      <div className="hidden xl:block">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 bg-white">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Event
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                User
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Rating
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Comment
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Date
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reviewsData.map((review) => (
              <tr
                key={review.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {review.eventName}
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {review.userName}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {review.rating}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-300 truncate max-w-xs">
                  {review.comment.length > 50
                    ? review.comment.slice(0, 50) + "..."
                    : review.comment}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {review.date}
                </td>
                <td
                  className={`px-4 py-2 font-medium ${
                    review.status === "Flagged"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {review.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleRespond(review.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Respond
                  </button>
                  <button
                    onClick={() => handleFlag(review.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Flag
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW for lg and below */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden mt-4">
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition text-center"
          >
            <h3 className="font-bold text-lg text-black dark:text-white mb-2">
              {review.eventName}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>User:</strong> {review.userName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Rating:</strong> {review.rating}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Comment:</strong> {review.comment}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {review.date}
            </p>
            <p
              className={`font-semibold mt-2 ${
                review.status === "Flagged" ? "text-red-500" : "text-green-500"
              }`}
            >
              {review.status}
            </p>

            <div className="mt-3 flex gap-2 justify-center">
              <button
                onClick={() => handleRespond(review.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Respond
              </button>
              <button
                onClick={() => handleFlag(review.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Flag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsList;
