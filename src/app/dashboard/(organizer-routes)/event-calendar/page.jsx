import Calendar from '@/components/Organizer/EventCalendar/Calendar';
import React from 'react';

const EventCalendar = () => {
    return (
        <div>
            <h1 className="text-xl font-bold mb-6">Event Calendar</h1>
            <Calendar/>
        </div>
    );
};

export default EventCalendar;