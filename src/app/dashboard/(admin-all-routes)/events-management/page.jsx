// app/(dashboard)/events/page.js
// এটি একটি Server Component হিসেবেই থাকতে পারে, যা Client Component-কে রেন্ডার করবে।

import EventList from '@/components/Admin-Routes-Components/EventList';
import { Toaster } from 'react-hot-toast'; // Toaster for notifications

export const metadata = {
    title: "Event Moderation",
};

export default function EventsManagement() {
    return (
        <div>
            {/* Client Component where all logic resides */}
            <EventList />
            
            {/* Toaster for showing success/error messages */}
            <Toaster position="top-right" />
        </div>
    );
}