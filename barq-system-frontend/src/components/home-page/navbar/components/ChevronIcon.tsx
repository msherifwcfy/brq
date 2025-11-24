interface ChevronIconProps {
    isOpen: boolean;
    className?: string;
}

export const ChevronIcon = ({ isOpen, className = '' }: ChevronIconProps) => {
    return (
        <div className={`flex items-center justify-center w-[20px] h-[20px] ${className}`}>
            {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                    <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                    <path d="M9.07747 0.528931L5.49997 4.10643L1.92247 0.528931L0.744141 1.70726L5.49997 6.4631L10.2558 1.70726L9.07747 0.528931Z" fill="white" />
                </svg>
            )}
        </div>
    );
};

interface ChevronIconWithHoverProps {
    isOpen: boolean;
    groupHoverClass: string;
}

export const ChevronIconWithHover = ({ isOpen, groupHoverClass }: ChevronIconWithHoverProps) => {
    return (
        <div className='flex items-center justify-center w-[20px] h-[20px]'>
            {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                    <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                </svg>
            ) : (
                <>
                    <svg className={groupHoverClass} xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path d="M9.07747 0.528931L5.49997 4.10643L1.92247 0.528931L0.744141 1.70726L5.49997 6.4631L10.2558 1.70726L9.07747 0.528931Z" fill="white" />
                    </svg>
                    <svg className={`hidden ${groupHoverClass.replace(':hidden', ':block')}`} xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path d="M1.92253 6.04065L5.50003 2.46315L9.07753 6.04065L10.2559 4.86232L5.50003 0.106484L0.744192 4.86232L1.92253 6.04065Z" fill="white" />
                    </svg>
                </>
            )}
        </div>
    );
};

