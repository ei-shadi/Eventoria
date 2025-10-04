import React from "react";
import { MdEmojiEvents } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const ticketTotalStats = [
  {
    totalEvents: 15,
    totalTicketsSold: 350,
    totalRevenue: 12500,
  },
];
const { totalEvents, totalTicketsSold, totalRevenue } = ticketTotalStats[0];
const TicketTotalStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Total Event Stats*/}
      <div className="relative w-full max-w-xs sm:max-w-lg rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl h-full">
        {/* --- Background Graphic --- */}
        <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
          <MdEmojiEvents className="w-40 h-40 text-white rotate-12" />
        </div>

        {/* --- Card Content Layout --- */}
        <div className="relative flex flex-col justify-between h-full">
          {/* TOP SECTION: Title and Icon Badge */}
          <div className="flex flex-col justify-between items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium lg:font-bold tracking-wide">
                Total Events
              </h2>
              {/* Icon Badge */}
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                <MdEmojiEvents className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* MIDDLE SECTION: Info */}
            <div className="flex-1 flex items-center pt-2">
              <p className="text-lg md:text-xl lg:text-2xl font-semibold opacity-90">
                {totalEvents}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Ticket Sold Stats count */}
      <div className="relative w-full max-w-xs sm:max-w-lg  rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-2xl h-full">
        {/* --- Background Trend Graphic --- */}
        <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
          <MdSell className="w-40 h-40 text-white rotate-12" />
        </div>
        {/* --- Card Content Layout --- */}
        <div className="relative flex flex-col  justify-between h-full">
          {/* TOP SECTION: Title and Icon Badge */}
          <div className="flex flex-col justify-between items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium  lg:font-bold tracking-wide">
                Total Ticket Sold
              </h2>
              {/* User Icon Badge  */}
              <div className="p-3 rounded-full bg-green-700/50 backdrop-blur-sm shadow-inner">
                <MdSell className="w-5 h-5" />
              </div>
            </div>

            {/* MIDDLE SECTION: Large Metric Number */}
            <div className="flex-1 flex items-center pt-2">
              <p className="text-2xl md:text-3xl lg:text-6xl font-bold lg:font-extrabold ">
                {totalTicketsSold || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Revenue Stats count */}

      <div className="relative w-full max-w-xs sm:max-w-lg  rounded-xl p-5 lg:p-9 overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-2xl h-full">
        {/* --- Background Trend Graphic --- */}
        <div className="absolute inset-0 flex items-center justify-start ml-24 opacity-10">
          <FaRegMoneyBillAlt className="w-40 h-40 text-white rotate-12" />
        </div>
        {/* --- Card Content Layout --- */}
        <div className="relative flex flex-col  justify-between h-full">
          {/* TOP SECTION: Title and Icon Badge */}
          <div className="flex flex-col justify-between items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium  lg:font-bold tracking-wide">
                Total Revenue
              </h2>
              {/* User Icon Badge  */}
              <div className="p-3 rounded-full bg-green-700/50 backdrop-blur-sm shadow-inner">
                <FaRegMoneyBillAlt className="w-5 h-5" />
              </div>
            </div>

            {/* MIDDLE SECTION: Large Metric Number */}
            <div className="flex-1 flex items-center pt-2">
              <p className="text-2xl md:text-3xl lg:text-6xl font-bold lg:font-extrabold ">
                ${totalRevenue || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTotalStats;
