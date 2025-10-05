import RatingsList from '@/components/Organizer/ReviewRatings/RatingsList';
import React from 'react';

const ReviewRatings = () => {
    return (
        <div className="p-3 md:p-6">
            <h1 className="text-2xl text-center lg:text-4xl font-bold mb-6">Review Ratings</h1>
            <RatingsList />
        </div>
    );
};

export default ReviewRatings;