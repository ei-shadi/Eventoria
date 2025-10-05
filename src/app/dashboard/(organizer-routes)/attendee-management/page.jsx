import AttendeeManagementCard from '@/components/Organizer/AttendeeManagement/AttendeeManagementCard';
import React from 'react';

const AttendeeManagement = () => {
    return (
        <div>
            <h1 className="text-2xl text-center lg:text-4xl font-bold mb-6">Attendee Management</h1>
            <AttendeeManagementCard />
        </div>
    );
};

export default AttendeeManagement;