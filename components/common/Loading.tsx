import React from 'react';
import { Spinner } from '@nextui-org/react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100 z-50 absolute top-0 left-0">
            <Spinner color="primary" size="lg" />
        </div>
    );
};

export default Loading;