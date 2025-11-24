'use client';

import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EventSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EventSuccessModal({ isOpen, onClose }: EventSuccessModalProps) {
    // Modal animation variants
    const modalVariants = {
        initial: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                duration: 0.5
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay
                className="bg-black/10 "
                style={{
                    // background: "rgba(0, 0, 0, 0.32)",
                    // backdropFilter: "blur(10px)"
                }}
            />
            <DialogContent
                className=" min-w-[620px] h-[332px] p-0 overflow-hidden"
                style={{
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    background: "rgba(0, 0, 0, 0.32)",
                    backdropFilter: "blur(10px)",
                    padding: "40px 24px",
                }}
                showCloseButton={false}
            >
                <motion.div
                    className="flex flex-col items-center gap-4"
                    variants={modalVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {/* Success Icon */}
                    <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center "
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring" as const,
                            stiffness: 200,
                            damping: 20,
                            delay: 0.2
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                            <path d="M14.8333 20.1667L22.8333 28.1667L44.1667 6.83333M44.1667 22.8333V38.8333C44.1667 40.2478 43.6048 41.6044 42.6046 42.6046C41.6044 43.6048 40.2478 44.1667 38.8333 44.1667H6.83333C5.41885 44.1667 4.06229 43.6048 3.0621 42.6046C2.0619 41.6044 1.5 40.2478 1.5 38.8333V6.83333C1.5 5.41885 2.0619 4.06229 3.0621 3.0621C4.06229 2.0619 5.41885 1.5 6.83333 1.5H30.8333" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        className="text-white text-[28px] h-[30px] lg:text-[36px] frutiger-lt-std-bold  leading-[43.2px]  text-center "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Thank You for Registering!
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-[#ECEEEE]  h-[48px] tracking-[0.02em] text-[16px] lg:text-[18px] text-center w-full leading-[27px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Thank you! We’ve received your information. A confirmation email will be sent to you shortly                    </motion.p>

                    {/* Done Button */}
                    <Button
                        onClick={onClose}
                        className='z-[3000] h-[48px] lg:h-[54px] mt-2 w-[572px] text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button'
                        style={{
                            background:
                                'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                            boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                            padding: '12px 20px',
                        }}
                    >
                        Done
                    </Button>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
