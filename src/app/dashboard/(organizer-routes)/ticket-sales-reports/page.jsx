import React from 'react';
import TicketTotalStats from '@/components/Organizer/TicketSalesReports/TicketTotalStats';
import TicketStatsEventWise from '@/components/Organizer/TicketSalesReports/TicketStatsEventWise';

const TicketSalesReports = () => {
    return (
        <div>
          
            <TicketTotalStats />
            <TicketStatsEventWise />
        </div>
    );
};

export default TicketSalesReports;