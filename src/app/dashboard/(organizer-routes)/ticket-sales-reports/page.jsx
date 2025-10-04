import React from 'react';
import TicketTotalStats from '@/components/Organizer/TicketSalesReports/TicketTotalStats';
import TicketStatsEventWise from '@/components/Organizer/TicketSalesReports/TicketStatsEventWise';

const TicketSalesReports = () => {
    return (
        <div>
            <h1 className="text-xl font-bold mb-6">Ticket Sales Reports</h1>
            <TicketTotalStats />
            <TicketStatsEventWise />
        </div>
    );
};

export default TicketSalesReports;