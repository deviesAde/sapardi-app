'use client';

import { motion } from 'framer-motion';

export default function GrowingLoader() {
    // Create multiple rice plants with different heights and delays
    const ricePlants = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        height: 60 + Math.random() * 40, // Random heights between 60-100
        delay: i * 0.3,
        swayDelay: i * 0.5,
    }));

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-green-50">
            <div className="flex flex-col items-center space-y-8">
                {/* Rice plants container */}
                <div className="relative flex h-32 items-end justify-center space-x-4">
                    {ricePlants.map((plant) => (
                        <div key={plant.id} className="relative">
                            {/* Plant stem */}
                            <motion.div
                                className="w-1 origin-bottom rounded-t-sm bg-gradient-to-t from-green-600 to-green-400"
                                style={{ height: `${plant.height}px` }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{
                                    duration: 1.5,
                                    delay: plant.delay,
                                    ease: 'easeOut',
                                }}
                            />

                            {/* Swaying animation for the whole plant */}
                            <motion.div
                                className="absolute inset-0 origin-bottom"
                                animate={{
                                    rotate: [-2, 2, -2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: plant.swayDelay,
                                    ease: 'easeInOut',
                                }}
                            >
                                {/* Rice grains at the top */}
                                <motion.div
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 transform"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: plant.delay + 1,
                                        ease: 'easeOut',
                                    }}
                                >
                                    {/* Multiple small rice grains */}
                                    {Array.from({ length: 8 }, (_, j) => (
                                        <motion.div
                                            key={j}
                                            className="absolute h-2 w-1 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-400"
                                            style={{
                                                left: `${(j % 4) * 3 - 4}px`,
                                                top: `${Math.floor(j / 4) * 3 - 6}px`,
                                            }}
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                delay: j * 0.1,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))}
                                </motion.div>

                                {/* Leaves */}
                                {Array.from({ length: 3 }, (_, leafIndex) => (
                                    <motion.div
                                        key={leafIndex}
                                        className="absolute h-1 w-8 origin-left rounded-full bg-gradient-to-r from-green-500 to-green-300"
                                        style={{
                                            left: leafIndex % 2 === 0 ? '2px' : '-6px',
                                            top: `${20 + leafIndex * 15}px`,
                                            transform: `rotate(${leafIndex % 2 === 0 ? '25deg' : '-25deg'})`,
                                        }}
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: plant.delay + 0.5 + leafIndex * 0.2,
                                            ease: 'easeOut',
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    ))}

                    {/* Wind effect particles */}
                    {Array.from({ length: 6 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-1 w-1 rounded-full bg-green-300/40"
                            style={{
                                left: `${20 + i * 30}px`,
                                top: `${10 + i * 8}px`,
                            }}
                            animate={{
                                x: [0, 50, 0],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.5,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                {/* Loading text */}
                <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
                    <h2 className="mb-3 text-2xl font-semibold text-green-800">Growing...</h2>
                    <motion.p
                        className="text-sm text-green-600"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                        }}
                    >
                        Please wait while we prepare your content
                    </motion.p>
                </motion.div>

                {/* Progress rice field */}
                <motion.div className="flex space-x-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                    {Array.from({ length: 8 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 rounded-t-sm bg-green-400"
                            animate={{
                                height: ['4px', '12px', '4px'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.1,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
