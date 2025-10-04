import TicketCardList from '@/components/Organizer/TicketManagement/TicketCardList';
import React from 'react';



const TicketManagement = () => {
    return (
        <div>
            <h1 className="text-xl font-bold mb-6">Ticket Management</h1>
            <TicketCardList/>
        </div>
    );
};

export default TicketManagement;