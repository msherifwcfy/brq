'use client'

import React from 'react'
import Navbar from '@/components/home-page/navbar'
import ContactUsClient from '@/components/contact-us/ContactUsClient'
import InteractiveMap from '@/components/contact-us/InteractiveMap'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ContactUsPageClient = () => {
    // Refs for scroll-triggered animations
    const contactRef = useRef(null)
    const mapRef = useRef(null)

    // Check if elements are in view
    const isContactInView = useInView(contactRef, { once: true, margin: "-100px" })
    const isMapInView = useInView(mapRef, { once: true, margin: "-100px" })

    // Animation variants for spring effects (slower animations)
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.2,
                staggerChildren: 0.4
            }
        }
    }

    const navbarVariants = {
        initial: { y: -50, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 25,
                delay: 0.3
            }
        }
    }

    const scrollTriggeredVariants = {
        initial: { y: 80, opacity: 0, scale: 0.9 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 60,
                damping: 20,
                duration: 1.5
            }
        }
    }

    return (
        <motion.div
            className='bg-black relative overflow-hidden'
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <div
                className='absolute inset-0 w-full h lg:h-[785px] h-[120vh]'
                style={{
                    backgroundImage: "url('/assets/contact-us/contact-us-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat',
                }}

            />
            <div
                className='absolute top-[30%] left-[15%] right-0 bottom-0 w-full h-[830px] hidden lg:block'
            >
                <Image src='/assets/contact-us/Ellipse 6.svg' alt='contact-us-bg' width={1440} height={1006} className='w-full object-cover' />
            </div>
            <div
                className='absolute top-0 left-0 right-0 bottom-0 w-full lg:h-[830px] h-[120vh]'
            >
                <Image src='/assets/contact-us/contact-us-bg.svg' alt='contact-us-bg' width={1440} height={830} className='w-full h-full object-cover' />
            </div>
            <motion.div
                className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'
                variants={navbarVariants}
            >
                <Navbar isHomePage={false} />
            </motion.div>
            <motion.div
                ref={contactRef}
                variants={scrollTriggeredVariants}
                initial="initial"
                animate={isContactInView ? "animate" : "initial"}
            >
                <ContactUsClient />
            </motion.div>
            <motion.div
                ref={mapRef}
                variants={scrollTriggeredVariants}
                initial="initial"
                animate={isMapInView ? "animate" : "initial"}
                transition={{ delay: 0.3 }}
            >
                <InteractiveMap />
            </motion.div>
        </motion.div>
    )
}

export default ContactUsPageClient
