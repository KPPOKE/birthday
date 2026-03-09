import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Heart({ position, scale, speed, color }) {
    const meshRef = useRef()

    const heartShape = useMemo(() => {
        const shape = new THREE.Shape()
        const x = 0, y = 0
        shape.moveTo(x + 0.25, y + 0.25)
        shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y)
        shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35)
        shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95)
        shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35)
        shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y)
        shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25)
        return shape
    }, [])

    const geometry = useMemo(() => {
        const extrudeSettings = {
            depth: 0.15,
            bevelEnabled: true,
            bevelSegments: 8,
            steps: 1,
            bevelSize: 0.05,
            bevelThickness: 0.05,
        }
        const geo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
        geo.center()
        geo.rotateZ(Math.PI)
        return geo
    }, [heartShape])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
            meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.1
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2
        }
    })

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </Float>
    )
}

function FloatingParticles() {
    const count = 80
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return pos
    }, [])

    const pointsRef = useRef()

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ff6b9d"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff6b9d" />
            <pointLight position={[-5, -3, 3]} intensity={0.5} color="#a78bfa" />
            <pointLight position={[0, 3, -5]} intensity={0.4} color="#ffd700" />

            {/* Main hearts */}
            <Heart position={[0, 0.3, 0]} scale={0.8} speed={1.2} color="#e84393" />
            <Heart position={[-2.5, 1, -2]} scale={0.4} speed={0.8} color="#ff6b9d" />
            <Heart position={[2.8, -0.5, -1.5]} scale={0.35} speed={1.0} color="#ff9ebb" />
            <Heart position={[-1.5, -1.2, -1]} scale={0.25} speed={1.5} color="#c2185b" />
            <Heart position={[1.8, 1.5, -2.5]} scale={0.3} speed={0.7} color="#ffc2d4" />
            <Heart position={[-3, 0.5, -3]} scale={0.2} speed={1.3} color="#a78bfa" />
            <Heart position={[3.5, 0.8, -2]} scale={0.22} speed={0.9} color="#ff6b9d" />

            <FloatingParticles />

            <Sparkles
                count={60}
                scale={12}
                size={2}
                speed={0.4}
                color="#ffd700"
                opacity={0.5}
            />
        </>
    )
}

export default function HeartsScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
            gl={{ alpha: true, antialias: true }}
        >
            <Scene />
        </Canvas>
    )
}
