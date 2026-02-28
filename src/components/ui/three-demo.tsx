"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, ContactShadows, Environment, Sky } from "@react-three/drei"
import * as THREE from "three"

// Centralized Colors for Realism
const COLORS = {
    wall: "#fafaf9", // Off-white, slightly warm
    wood: "#8b5a2b", // Rich chestnut wood
    glass: "#bae6fd", // Very transparent blue
    glassDark: "#0f172a", // Darker privacy glass
    trimDark: "#334155", // Slate trim for roofs
    frame: "#1e293b", // Window frames
    road: "#475569", // Asphalt grey
    curb: "#94a3b8", // Light concrete
    driveway: "#cbd5e1", // Pavers/Concrete
    grass: "#4ade80", // Lush green
    bush: "#15803d", // Deep foliage
    treeBark: "#452c1e",
    carWhite: "#f8fafc",
    carSilver: "#94a3b8",
    carDark: "#1e293b"
}

// Complex Procedural Tree (Multiple spherical leaves for fluffiness)
function Tree({ position }: { position: [number, number, number] }) {
    const leaves = useMemo(() => {
        const l = []
        for (let i = 0; i < 7; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = 2.5 + Math.random() * 2.5;
            const z = (Math.random() - 0.5) * 2;
            const radius = 1.2 + Math.random() * 0.8;
            l.push(
                <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
                    <sphereGeometry args={[radius, 16, 16]} />
                    <meshStandardMaterial color={COLORS.bush} roughness={0.9} />
                </mesh>
            )
        }
        return l;
    }, [])

    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.3, 3]} />
                <meshStandardMaterial color={COLORS.treeBark} roughness={1} />
            </mesh>
            {/* Leaves */}
            {leaves}
        </group>
    )
}

function Car({ position, rotation, color = COLORS.carWhite }: { position: [number, number, number], rotation: [number, number, number], color?: string }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 0.5, 4]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.85, -0.2]} castShadow>
                <boxGeometry args={[1.3, 0.4, 2]} />
                <meshPhysicalMaterial color={COLORS.glassDark} transmission={0.4} opacity={1} roughness={0.1} />
            </mesh>
            {[-0.9, 0.9].map((x) =>
                [-1.3, 1.3].map((z) => (
                    <mesh key={`wheel-${x}-${z}`} position={[x, 0.2, z]} castShadow rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                        <meshStandardMaterial color="#020617" roughness={0.8} />
                    </mesh>
                ))
            )}
        </group>
    )
}

// Hyper-Detailed 3D House 
// Faithfully matching the provided render image structure
function LuxuryHouse({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* --- GROUND FLOOR --- */}
            {/* Main Ground Block */}
            <mesh position={[0, 1.5, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[8.5, 3, 8]} />
                <meshStandardMaterial color={COLORS.wall} roughness={0.9} />
            </mesh>

            {/* Left Output (Window Area) */}
            <mesh position={[-2.5, 1.5, 4]} castShadow receiveShadow>
                <boxGeometry args={[3.5, 3, 1]} />
                <meshStandardMaterial color={COLORS.wall} roughness={0.9} />
            </mesh>
            {/* Massive Ground Window Frame */}
            <mesh position={[-2.5, 1.5, 4.55]} castShadow>
                <boxGeometry args={[3, 2.2, 0.1]} />
                <meshStandardMaterial color={COLORS.frame} roughness={0.4} metalness={0.5} />
            </mesh>
            {/* Ground Window Glass */}
            <mesh position={[-2.5, 1.5, 4.6]} receiveShadow>
                <planeGeometry args={[2.8, 2]} />
                <meshPhysicalMaterial color={COLORS.glassDark} transmission={0.9} opacity={1} roughness={0.1} />
            </mesh>

            {/* Entrance Recess Box (Right side) */}
            <mesh position={[2, 1.5, 3.5]} receiveShadow>
                <boxGeometry args={[4, 3, 0.1]} />
                <meshStandardMaterial color={COLORS.wall} roughness={0.9} />
            </mesh>
            {/* Actual Door */}
            <mesh position={[2, 1.25, 3.55]} castShadow>
                <boxGeometry args={[1.5, 2.3, 0.05]} />
                <meshStandardMaterial color={COLORS.wood} roughness={0.6} />
            </mesh>

            {/* Front Porch / Steps leading to door */}
            <mesh position={[2, 0.15, 4.5]} receiveShadow castShadow>
                <boxGeometry args={[4.5, 0.3, 2]} />
                <meshStandardMaterial color={COLORS.driveway} roughness={0.9} />
            </mesh>
            <mesh position={[2, 0.45, 4.0]} receiveShadow castShadow>
                <boxGeometry args={[4.5, 0.3, 1]} />
                <meshStandardMaterial color={COLORS.driveway} roughness={0.9} />
            </mesh>

            {/* --- FIRST FLOOR --- */}
            {/* Main First floor block, slightly pushed back to create balcony */}
            <mesh position={[0, 4.5, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[8.5, 3, 8]} />
                <meshStandardMaterial color={COLORS.wall} roughness={0.9} />
            </mesh>

            {/* Balcony Overhang Floor (Separating ground and first) */}
            <mesh position={[0, 3.05, 1.5]} castShadow receiveShadow>
                <boxGeometry args={[8.7, 0.1, 4]} />
                <meshStandardMaterial color={COLORS.trimDark} roughness={0.8} />
            </mesh>

            {/* The distinct WOODEN SLAT panel on the right upper side */}
            <mesh position={[2.5, 4.5, 3.6]} castShadow receiveShadow>
                <boxGeometry args={[2.5, 3, 0.2]} />
                <meshStandardMaterial color={COLORS.wood} roughness={0.7} />
            </mesh>

            {/* Left Upper Window Frame */}
            <mesh position={[-2.5, 4.5, 3.55]} castShadow>
                <boxGeometry args={[3, 2.2, 0.1]} />
                <meshStandardMaterial color={COLORS.frame} roughness={0.4} metalness={0.5} />
            </mesh>
            {/* Left Upper Glass */}
            <mesh position={[-2.5, 4.5, 3.6]} receiveShadow>
                <planeGeometry args={[2.8, 2]} />
                <meshPhysicalMaterial color={COLORS.glassDark} transmission={0.9} opacity={1} roughness={0.1} />
            </mesh>

            {/* Continuous Glass Balcony Railing */}
            <mesh position={[0, 3.6, 3.5]} castShadow receiveShadow>
                <boxGeometry args={[8.5, 1.0, 0.05]} />
                <meshPhysicalMaterial color={COLORS.glass} transmission={0.95} opacity={1} roughness={0.05} />
            </mesh>
            {/* Balcony Top Handrail */}
            <mesh position={[0, 4.1, 3.5]} castShadow>
                <boxGeometry args={[8.5, 0.05, 0.1]} />
                <meshStandardMaterial color={COLORS.frame} roughness={0.5} />
            </mesh>

            {/* --- ROOF AREA --- */}
            {/* Thick Parapet Roof Trim */}
            <mesh position={[0, 6.1, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[8.7, 0.2, 8.2]} />
                <meshStandardMaterial color={COLORS.trimDark} roughness={0.8} />
            </mesh>

            {/* Roof Extension / Stairwell (Left Box) */}
            <mesh position={[-2, 6.6, -2]} castShadow receiveShadow>
                <boxGeometry args={[3, 1, 4]} />
                <meshStandardMaterial color={COLORS.wall} roughness={0.9} />
            </mesh>
            <mesh position={[-2, 7.15, -2]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 0.1, 4.2]} />
                <meshStandardMaterial color={COLORS.trimDark} roughness={0.8} />
            </mesh>

            {/* Black HVAC / Water Tank (Right Box) */}
            <mesh position={[2, 6.5, -1]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.8, 1.5]} />
                <meshStandardMaterial color="#020617" roughness={0.7} />
            </mesh>

            {/* Side Stairs Green Box (Present on some houses in the image) */}
            <mesh position={[-4.5, 1.5, 1]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 3, 2.5]} />
                <meshStandardMaterial color={COLORS.bush} roughness={0.9} />
            </mesh>
            {/* Side stairs geometry */}
            <mesh position={[-4.5, 0.5, 3]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 1, 1.5]} />
                <meshStandardMaterial color={COLORS.driveway} roughness={0.9} />
            </mesh>
        </group>
    )
}

function PoshNeighborhood() {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
        }
    })

    const scene = useMemo(() => {
        const items = [];

        // 1. Lush Green Real-Estate Base
        items.push(
            <mesh key="base-grass" rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color={COLORS.grass} roughness={1} />
            </mesh>
        )

        // 2. Complex Road System (T-Junction)
        // Main Vertical Road
        items.push(
            <mesh key="road-main" rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <planeGeometry args={[16, 160]} />
                <meshStandardMaterial color={COLORS.road} roughness={0.9} />
            </mesh>
        )
        // Horizontal Road (T-Junction top)
        items.push(
            <mesh key="road-cross" rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -60]} receiveShadow>
                <planeGeometry args={[100, 16]} />
                <meshStandardMaterial color={COLORS.road} roughness={0.9} />
            </mesh>
        )

        // Curbs for Main Road
        items.push(
            <mesh key="curb-l" rotation={[-Math.PI / 2, 0, 0]} position={[-8.1, 0.05, 0]} receiveShadow castShadow>
                <planeGeometry args={[0.2, 160]} />
                <meshStandardMaterial color={COLORS.curb} roughness={0.9} />
            </mesh>,
            <mesh key="curb-r" rotation={[-Math.PI / 2, 0, 0]} position={[8.1, 0.05, 0]} receiveShadow castShadow>
                <planeGeometry args={[0.2, 160]} />
                <meshStandardMaterial color={COLORS.curb} roughness={0.9} />
            </mesh>
        )

        // Generate the strict, orderly layout of identical luxury houses
        const leftZPositions = [-35, -10, 15, 40];
        const rightZPositions = [-25, 0, 25, 50]; // Staggered for realism
        const topXPositions = [-30, 30];

        // Left Houses
        leftZPositions.forEach((z, idx) => {
            // The House
            items.push(<LuxuryHouse key={`house-l-${idx}`} position={[-18, 0, z]} rotation={[0, Math.PI / 2, 0]} />);

            // Paver Driveway
            items.push(
                <mesh key={`driveway-l-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[-13, 0.03, z + 2]} receiveShadow>
                    <planeGeometry args={[9, 6]} />
                    <meshStandardMaterial color={COLORS.driveway} roughness={0.9} />
                </mesh>
            )
            // Car in driveway
            if (idx % 2 === 0) {
                items.push(<Car key={`car-l-${idx}`} position={[-12.5, 0, z + 2]} rotation={[0, Math.PI / 2, 0]} color={COLORS.carSilver} />)
            }

            // Front Yard Hedge Planters (Image detail)
            items.push(
                <mesh key={`planter-l-${idx}`} position={[-13, 0.2, z - 2.5]} receiveShadow castShadow>
                    <boxGeometry args={[7, 0.4, 1.5]} />
                    <meshStandardMaterial color={COLORS.curb} roughness={0.9} />
                </mesh>,
                <mesh key={`bush-l-${idx}`} position={[-13, 0.7, z - 2.5]} receiveShadow castShadow>
                    <boxGeometry args={[6.6, 0.6, 1.1]} />
                    <meshStandardMaterial color={COLORS.bush} roughness={0.9} />
                </mesh>
            )
        })

        // Right Houses
        rightZPositions.forEach((z, idx) => {
            // The House
            items.push(<LuxuryHouse key={`house-r-${idx}`} position={[18, 0, z]} rotation={[0, -Math.PI / 2, 0]} />);

            // Paver Driveway
            items.push(
                <mesh key={`driveway-r-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[13, 0.03, z - 2]} receiveShadow>
                    <planeGeometry args={[9, 6]} />
                    <meshStandardMaterial color={COLORS.driveway} roughness={0.9} />
                </mesh>
            )
            // Car in driveway
            if (idx % 2 !== 0) {
                items.push(<Car key={`car-r-${idx}`} position={[13, 0, z - 2]} rotation={[0, -Math.PI / 2, 0]} color={COLORS.carDark} />)
            }

            // Front Yard Hedge Planters
            items.push(
                <mesh key={`planter-r-${idx}`} position={[13, 0.2, z + 2.5]} receiveShadow castShadow>
                    <boxGeometry args={[7, 0.4, 1.5]} />
                    <meshStandardMaterial color={COLORS.curb} roughness={0.9} />
                </mesh>,
                <mesh key={`bush-r-${idx}`} position={[13, 0.7, z + 2.5]} receiveShadow castShadow>
                    <boxGeometry args={[6.6, 0.6, 1.1]} />
                    <meshStandardMaterial color={COLORS.bush} roughness={0.9} />
                </mesh>
            )
        })

        // Top Houses along T-Junction
        topXPositions.forEach((x, idx) => {
            items.push(<LuxuryHouse key={`house-t-${idx}`} position={[x, 0, -80]} rotation={[0, 0, 0]} />);
            items.push(
                <mesh key={`driveway-t-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[x - 2, 0.03, -71]} receiveShadow>
                    <planeGeometry args={[6, 9]} />
                    <meshStandardMaterial color={COLORS.driveway} roughness={0.9} />
                </mesh>
            )
        })


        // Dense Trees in Background and along sidewalks
        for (let tz = -70; tz <= 60; tz += 15) {
            items.push(<Tree key={`tree-s-l-${tz}`} position={[-10, 0, tz]} />)
            items.push(<Tree key={`tree-s-r-${tz}`} position={[10, 0, tz]} />)

            // Background deep forest
            items.push(<Tree key={`tree-bg-l1-${tz}`} position={[-35 + Math.random() * 5, 0, tz]} />)
            items.push(<Tree key={`tree-bg-l2-${tz}`} position={[-45 + Math.random() * 5, 0, tz]} />)
            items.push(<Tree key={`tree-bg-r1-${tz}`} position={[35 + Math.random() * 5, 0, tz]} />)
            items.push(<Tree key={`tree-bg-r2-${tz}`} position={[45 + Math.random() * 5, 0, tz]} />)
        }

        // Add moving cars on the road
        items.push(<Car key="moving-car-1" position={[-3.5, 0, 20]} rotation={[0, Math.PI, 0]} color={COLORS.carWhite} />)
        items.push(<Car key="moving-car-2" position={[3.5, 0, -20]} rotation={[0, 0, 0]} color={COLORS.carSilver} />)

        return items;
    }, []);

    return (
        <group ref={groupRef} position={[0, -2, 0]}>
            {scene}
        </group>
    )
}

export function ThreeDemo() {
    return (
        <div className="w-full h-full min-h-[500px] bg-sky-50 relative overflow-hidden rounded-3xl">
            <Canvas camera={{ position: [35, 25, 45], fov: 40 }} shadows>
                {/* Soft blue fog blending into the sky */}
                <fog attach="fog" args={['#e0f2fe', 40, 150]} />

                {/* Beautiful Soft Global Illumination Setup */}
                <ambientLight intensity={0.6} color="#ffffff" />

                {/* Primary Sun casting soft, defined shadows */}
                <directionalLight
                    position={[50, 60, 30]}
                    intensity={1.2}
                    color="#fdf4ff"
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={200}
                    shadow-camera-left={-50}
                    shadow-camera-right={50}
                    shadow-camera-top={50}
                    shadow-camera-bottom={-50}
                    shadow-bias={-0.0005}
                />

                {/* Fill light to mimic sky reflection, reducing harsh blacks */}
                <directionalLight position={[-30, 20, -30]} intensity={0.5} color="#bae6fd" />

                {/* Realistic Skybox with soft, slightly hazy sun */}
                <Sky distance={450000} sunPosition={[50, 60, 30]} inclination={0.2} azimuth={0.25} turbidity={0.3} rayleigh={0.5} mieCoefficient={0.005} />

                <PoshNeighborhood />

                <Environment preset="city" />

                {/* Deep dramatic shadow block underneath everything */}
                <ContactShadows position={[0, -2.05, 0]} opacity={0.6} scale={150} blur={3} far={10} color="#000000" />

                <OrbitControls
                    enableZoom={true}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 2.2} // Prevent camera going underground
                    minDistance={15}
                    maxDistance={100}
                    target={[0, 0, 0]}
                    enableDamping
                    dampingFactor={0.05}
                />
            </Canvas>

            {/* Overlay Map Legend */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-xl pointer-events-none text-sm font-medium z-10 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-md bg-white border border-slate-400"></span>
                    <span className="text-slate-700">Premium Estate Layout</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                    <span className="text-slate-700">Lush Vegetation</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-slate-600 border border-slate-900"></span>
                    <span className="text-slate-700">Planned Roadways</span>
                </div>
            </div>

            {/* Cinematic Logo Overlay */}
            <div className="absolute top-6 right-6 font-mono text-xs text-slate-500 tracking-widest pointer-events-none bg-white/50 px-3 py-1 rounded-full backdrop-blur-md border border-slate-200/50">
                AI PHOTOREALISTIC RENDERING (BETA)
            </div>
        </div>
    )
}
