"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, ContactShadows, Edges, Environment } from "@react-three/drei"
import * as THREE from "three"

// Centralized colors for the technical deep-tech aesthetic
const T = {
    floor: "#f1f5f9",    // Light slate
    wall: "#cbd5e1",     // Slate
    glass: "#bae6fd",    // Light blue trans
    accent: "#3b82f6",   // TrueMap Blue
    path: "#ec4899",     // TrueMap Pink/Magenta map path
    node: "#f59e0b"      // Amber POI
}

function Floor({ position, width, depth, height }: { position: [number, number, number], width: number, depth: number, height: number }) {
    return (
        <group position={position}>
            {/* The base floor concrete slab */}
            <mesh position={[0, -height / 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[width, 0.4, depth]} />
                <meshStandardMaterial color={T.floor} roughness={0.8} />
                <Edges color="#94a3b8" />
            </mesh>

            {/* Back Wall (Slightly transparent) */}
            <mesh position={[0, 0, -depth / 2 + 0.2]} receiveShadow>
                <boxGeometry args={[width, height, 0.4]} />
                <meshPhysicalMaterial color={T.wall} transmission={0.2} opacity={0.8} roughness={0.3} />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-width / 2 + 0.2, 0, 0]} receiveShadow>
                <boxGeometry args={[0.4, height, depth]} />
                <meshPhysicalMaterial color={T.wall} transmission={0.2} opacity={0.8} roughness={0.3} />
            </mesh>

            {/* Internal partitions (Randomized per floor to look like offices/mall stores) */}
            <mesh position={[-2, 0, -2]} castShadow receiveShadow>
                <boxGeometry args={[0.2, height, depth / 2]} />
                <meshStandardMaterial color={T.floor} roughness={0.9} />
            </mesh>
            <mesh position={[3, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, height, depth - 2]} />
                <meshStandardMaterial color={T.floor} roughness={0.9} />
            </mesh>

            {/* Glass Front (Cross-section view) */}
            <mesh position={[0, 0, depth / 2 - 0.1]}>
                <boxGeometry args={[width, height, 0.2]} />
                <meshPhysicalMaterial color={T.glass} transmission={0.9} opacity={1} roughness={0.05} />
                <Edges color="#7dd3fc" />
            </mesh>

            {/* Elevator Shaft Core */}
            <mesh position={[0, 0, -depth / 2 + 1.5]} castShadow receiveShadow>
                <boxGeometry args={[2.5, height, 2.5]} />
                <meshStandardMaterial color="#64748b" roughness={0.5} />
            </mesh>
        </group>
    )
}

function NavigationPath() {
    const lineRef = useRef<any>(null);

    // Animate the path dash offset to simulate data flowing/routing
    useFrame((state) => {
        if (lineRef.current?.material) {
            lineRef.current.material.dashOffset -= 0.02;
        }
    })

    const points = useMemo(() => [
        new THREE.Vector3(-4, -1, 3),    // F1 Start
        new THREE.Vector3(1, -1, 3),     // F1 Walk right
        new THREE.Vector3(1, -1, -5),    // F1 Walk back
        new THREE.Vector3(0, -1, -6),    // Enter Elevator
        new THREE.Vector3(0, 3, -6),     // F2 Elevator Stop
        new THREE.Vector3(0, 7, -6),     // F3 Elevator Stop (Error/Reroute)
        new THREE.Vector3(0, 7, -2),     // F3 Walk forward
        new THREE.Vector3(3, 7, -2),     // F3 Walk right
        new THREE.Vector3(3, 7, 2),      // F3 Arrive at POI
    ], []);

    const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0), [points]);
    const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.15, 8, false), [curve]);

    return (
        <group>
            {/* Glowing Map Path */}
            <mesh geometry={tubeGeometry} ref={lineRef}>
                <meshStandardMaterial
                    color={T.path}
                    emissive={T.path}
                    emissiveIntensity={2}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Start Node */}
            <mesh position={[-4, -1, 3]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color={T.accent} emissive={T.accent} emissiveIntensity={2} />
            </mesh>

            {/* End Point of Interest (Store/Gate) */}
            <mesh position={[3, 7, 2]}>
                <cylinderGeometry args={[0.6, 0, 1.2, 4]} />
                <meshStandardMaterial color={T.node} emissive={T.node} emissiveIntensity={2} />
            </mesh>
            {/* Floating Ring around End Point */}
            <mesh position={[3, 7, 2]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.05, 16, 32]} />
                <meshStandardMaterial color={T.node} emissive={T.node} emissiveIntensity={1} />
            </mesh>
        </group>
    )
}

function BuildingCrossSection() {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((state) => {
        if (groupRef.current) {
            // Very slow, gentle oscillation to show off the 3D depth
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15 - 0.2
        }
    })

    const width = 12;
    const depth = 16;
    const height = 4;

    return (
        <group ref={groupRef} position={[0, -3, 0]}>
            <Floor position={[0, 0, 0]} width={width} depth={depth} height={height} />
            <Floor position={[0, height, 0]} width={width} depth={depth} height={height} />
            <Floor position={[0, height * 2, 0]} width={width} depth={depth} height={height} />

            {/* The TrueMap Routing Path navigating the complex indoor space */}
            <NavigationPath />
        </group>
    )
}

export function CrossSectionDemo() {
    return (
        <div className="w-full h-full min-h-[500px] bg-slate-50 relative overflow-hidden">
            <Canvas camera={{ position: [18, 12, 18], fov: 45 }} shadows>
                <fog attach="fog" args={['#f8fafc', 20, 60]} />

                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 20, 10]}
                    intensity={1.5}
                    castShadow
                    color="#ffffff"
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <directionalLight
                    position={[-10, 10, -10]}
                    intensity={0.5}
                    color="#bae6fd"
                />

                <BuildingCrossSection />

                <Environment preset="city" />

                {/* Contact shadow for grounding the building */}
                <ContactShadows position={[0, -3.2, 0]} opacity={0.4} scale={30} blur={2} far={10} color="#000000" />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2.1}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute top-4 left-4 font-mono text-xs text-slate-500 uppercase tracking-widest bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200">
                Data Node Routing
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-xs text-emerald-600 bg-emerald-50/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Path Computed
            </div>
        </div>
    )
}
