import React, { useState } from 'react'
import { useTimeFilter } from '../../../hooks/useTimeFilter';
import { AnimatePresence } from 'motion/react';
import MobileTaskCard from './list/MobileTaskCard';
import type { TaskOccurrence } from '../../../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

const MobileTasksList = () => {
    
  const {taskData} = useSelector((state: RootState)=> state.task);

        const {
            // data: occurrences,
            loading: isLoading,
            timeframe,
            setTimeframe,
            currentPage,
            setCurrentPage,
            totalPages,
            totalItems,
            pageSize,
            setPageSize,
            searchQuery,
            setSearchQuery,
            statusFilter,
            setStatusFilter,
        } = useTimeFilter();

        
            const [selectedOccurrence, setSelectedOccurrence] = useState<TaskOccurrence | null>(null);
    const activeSelected = selectedOccurrence ?? taskData[0] ?? null;
    

    return (
        <div className='lg:hidden h-full w-fullflex'>

            <div className="min-h-0 flex-1 overflow-y-auto px-2 my-2 scrollbar-none space-y-1">
                        {isLoading ? (
                            <div className="py-8 text-center text-xs text-(--secondary-text) animate-pulse">
                                Loading occurrences...
                            </div>
                        ) : taskData.length === 0 ? (
                            <div className="py-12 text-center text-xs text-(--secondary-text)">
                                No occurrences found for selected timeframe.
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {taskData.map((item) => (
                                    <React.Fragment key={item.id}>
                                        {/* Mobile Specialized Card View */}
                                        <div className="block sm:hidden">
                                            <MobileTaskCard
                                                occurrence={item}
                                                isSelected={activeSelected?.id === item.id}
                                                onSelect={setSelectedOccurrence}
                                            />
                                        </div>
                                    </React.Fragment>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

        </div>
    )
}

export default MobileTasksList