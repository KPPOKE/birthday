import { useEffect } from 'react';
import gsap from 'gsap';

export default function useMagneticHover(ref) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Create quickSetter functions for performance
        const xTo = gsap.quickTo(element, "x", { duration: 0.6, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.6, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();

            // Calculate distance from center of element
            const x = (clientX - (left + width / 2)) * 0.3; // 0.3 is the pull strength
            const y = (clientY - (top + height / 2)) * 0.3;

            xTo(x);
            yTo(y);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref]);
}
