import AttendeeManagementCard from '@/components/Organizer/AttendeeManagement/AttendeeManagementCard';
import React from 'react';

const AttendeeManagement = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Attendee Management</h1>
            <AttendeeManagementCard />
        </div>
    );
};

export default AttendeeManagement;