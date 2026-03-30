"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position, color, invert }: { position: number, color: string, invert?: boolean }) {
    const finalPosition = invert ? position * -1 : position;
    
    const paths = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 10 * finalPosition} -${189 + i * 12}C-${
            380 - i * 10 * finalPosition
        } -${189 + i * 12} -${312 - i * 10 * finalPosition} ${216 - i * 12} ${
            152 - i * 10 * finalPosition
        } ${343 - i * 12}C${616 - i * 10 * finalPosition} ${470 - i * 12} ${
            684 - i * 10 * finalPosition
        } ${875 - i * 12} ${684 - i * 10 * finalPosition} ${875 - i * 12}`,
        width: 1 + i * 0.06,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                style={{ color }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.2 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.2 }}
                        animate={{
                            pathLength: [0.3, 1, 0.3],
                            opacity: [0.2, 0.4, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({ invert }: { invert?: boolean }) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <FloatingPaths position={1} color="#E31E24" invert={invert} />
            <FloatingPaths position={-1} color="#3B82F6" invert={invert} />
        </div>
    );
}
