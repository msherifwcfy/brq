'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type RevealOnScrollProps = {
    children: ReactNode
    className?: string
}

export default function RevealOnScroll({ children, className }: RevealOnScrollProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: 'easeInOut' },
                },
            }}
        >
            {children}
        </motion.div>
    )
}


