"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, ContactShadows, Environment, Sky } from "@react-three/drei"
import * as THREE from "three"

// Moving traffic dots
function Traffic({ x, z, direction, color }: { x: number, z: number, direction: "z" | "x", color: string }) {
    const carRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (!carRef.current) return;
        const speed = 2; // units per second
        const time = state.clock.elapsedTime

        // Loop position between -25 and +25
        if (direction === "z") {
            const posZ = ((z + time * speed + 25) % 50) - 25;
            carRef.current.position.z = posZ;
        } else {
            const posX = ((x + time * speed + 25) % 50) - 25;
            carRef.current.position.x = posX;
        }
    })

    return (
        <mesh ref={carRef} position={[x, 0.2, z]} castShadow>
            <boxGeometry args={direction === 'z' ? [0.4, 0.3, 0.8] : [0.8, 0.3, 0.4]} />
            <meshStandardMaterial color={color} roughness={0.3} />
            {/* Headlights / Taillights */}
            <pointLight distance={2} intensity={0.5} color={color === '#ef4444' ? '#ff0000' : '#ffffff'} />
        </mesh>
    )
}

function CityMap() {
    const groupRef = useRef<THREE.Group>(null!)

    // Slowly rotate the entire city
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
        }
    })

    const cityElements = useMemo(() => {
        const elements = []

        // 1. Ground Layer (Grass/Concrete)
        elements.push(
            <mesh key="ground" rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[70, 70]} />
                <meshStandardMaterial color="#22c55e" roughness={1} /> {/* Grass green base */}
            </mesh>
        )

        // 2. Concrete City Base Plinth
        elements.push(
            <mesh key="concrete-base" rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
            </mesh>
        )

        // 3. Asphalt Roads
        const roadMaterial = new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.9, metalness: 0.1 });
        // Main Vertical Roads
        for (let i = -20; i <= 20; i += 10) {
            elements.push(
                <mesh key={`v-road-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[i, 0.01, 0]} receiveShadow>
                    <planeGeometry args={[3, 50]} />
                    <primitive object={roadMaterial} />
                </mesh>
            )
            // Yellow center lines
            elements.push(
                <mesh key={`v-line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[i, 0.02, 0]} receiveShadow>
                    <planeGeometry args={[0.1, 50]} />
                    <meshBasicMaterial color="#facc15" />
                </mesh>
            )
        }
        // Main Horizontal Roads
        for (let i = -20; i <= 20; i += 10) {
            elements.push(
                <mesh key={`h-road-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, i]} receiveShadow>
                    <planeGeometry args={[50, 3]} />
                    <primitive object={roadMaterial} />
                </mesh>
            )
            // Yellow center lines
            elements.push(
                <mesh key={`h-line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, i]} receiveShadow>
                    <planeGeometry args={[50, 0.1]} />
                    <meshBasicMaterial color="#facc15" />
                </mesh>
            )
        }

        // 4. Traffic Configuration (Adding moving cars to the roads)
        const trafficColors = ['#ef4444', '#3b82f6', '#ffffff', '#10b981', '#f59e0b'];
        for (let i = -20; i <= 20; i += 10) {
            // Cars on Vertical roads
            elements.push(<Traffic key={`car-v-1-${i}`} x={i + 0.7} z={Math.random() * 40 - 20} direction="z" color={trafficColors[Math.floor(Math.random() * trafficColors.length)]} />)
            elements.push(<Traffic key={`car-v-2-${i}`} x={i - 0.7} z={Math.random() * 40 - 20} direction="z" color={trafficColors[Math.floor(Math.random() * trafficColors.length)]} />)
            // Cars on Horizontal roads
            elements.push(<Traffic key={`car-h-1-${i}`} x={Math.random() * 40 - 20} z={i + 0.7} direction="x" color={trafficColors[Math.floor(Math.random() * trafficColors.length)]} />)
            elements.push(<Traffic key={`car-h-2-${i}`} x={Math.random() * 40 - 20} z={i - 0.7} direction="x" color={trafficColors[Math.floor(Math.random() * trafficColors.length)]} />)
        }

        // 5. Airport (Top Right: x=15 to 25, z=-15 to -25)
        elements.push(
            <group key="airport" position={[15, 0, -20]}>
                {/* Runway */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.02, 0]} receiveShadow>
                    <planeGeometry args={[4, 25]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.9} />
                </mesh>
                {/* Runway markings */}
                {Array.from({ length: 11 }).map((_, i) => {
                    const k = -10 + i * 2;
                    return (
                        <mesh key={`runway-mark-${k}`} rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.03, k]} receiveShadow>
                            <planeGeometry args={[0.3, 1]} />
                            <meshBasicMaterial color="#ffffff" />
                        </mesh>
                    )
                })}

                {/* Terminal Building */}
                <mesh position={[-2, 0.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[5, 1, 9]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.2} />
                </mesh>
                <mesh position={[-2, 1.25, 0]} castShadow receiveShadow>
                    <boxGeometry args={[4, 0.5, 7.5]} />
                    <meshPhysicalMaterial color="#bae6fd" transmission={0.9} opacity={1} roughness={0.1} ior={1.5} thickness={0.5} />
                </mesh>
                <mesh position={[-2, 1.6, 0]} castShadow receiveShadow>
                    <boxGeometry args={[4.2, 0.2, 7.7]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>

                {/* Control Tower */}
                <mesh position={[-4, 2, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.5, 0.8, 4, 16]} />
                    <meshStandardMaterial color="#e2e8f0" />
                </mesh>
                <mesh position={[-4, 4.25, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.8, 0.6, 0.5, 16]} />
                    <meshPhysicalMaterial color="#38bdf8" transmission={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[-4, 4.6, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
                    <meshStandardMaterial color="#ef4444" />
                </mesh>

                {/* Ambient Airport Lighting */}
                <pointLight position={[-4, 5, 0]} intensity={2} color="#facc15" distance={10} />
            </group>
        )

        // 6. Shopping Mall (Bottom Left: x=-15, z=15)
        elements.push(
            <group key="mall" position={[-15, 0, 15]}>
                {/* Mall Base */}
                <mesh position={[0, 1, 0]} castShadow receiveShadow>
                    <boxGeometry args={[14, 2, 12]} />
                    <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
                </mesh>
                {/* Mall Entrances */}
                <mesh position={[0, 1, 6.1]} castShadow receiveShadow>
                    <boxGeometry args={[4, 1.5, 0.2]} />
                    <meshPhysicalMaterial color="#2dd4bf" transmission={0.8} roughness={0.2} />
                </mesh>

                {/* Glass Atrium */}
                <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[4, 4, 1, 32]} />
                    <meshPhysicalMaterial color="#ec4899" transmission={0.9} opacity={1} roughness={0.1} />
                </mesh>
                <mesh position={[0, 3, 0]} castShadow receiveShadow>
                    <sphereGeometry args={[4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial color="#ec4899" transmission={0.95} opacity={1} roughness={0.05} ior={1.3} thickness={1} />
                </mesh>

                {/* Parking Lot */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 9]} receiveShadow>
                    <planeGeometry args={[14, 6]} />
                    <meshStandardMaterial color="#475569" roughness={0.9} />
                </mesh>
                {/* Trees around parking lot */}
                {[[-6, 7], [-6, 11], [6, 7], [6, 11], [0, 11.5]].map((pos, idx) => (
                    <group key={`tree-mall-${idx}`} position={[pos[0], 0, pos[1]]}>
                        <mesh position={[0, 0.5, 0]} castShadow>
                            <cylinderGeometry args={[0.1, 0.1, 1]} />
                            <meshStandardMaterial color="#78350f" />
                        </mesh>
                        <mesh position={[0, 1.2, 0]} castShadow>
                            <sphereGeometry args={[0.6, 8, 8]} />
                            <meshStandardMaterial color="#15803d" roughness={0.8} />
                        </mesh>
                    </group>
                ))}

                {/* Night mall light */}
                <pointLight position={[0, 4, 0]} intensity={1.5} color="#ec4899" distance={15} />
            </group>
        )

        // 7. Generic City Blocks (Downtown, Residential, Commercial) 
        // Generates realistic multi-tier buildings with windows, setbacks, and roofs
        const generateBlock = (bx: number, bz: number, sizeX: number, sizeZ: number, density: string) => {
            const blockElements = [];
            const blockGroupKey = `block-${bx}-${bz}`;
            const numBuildings = density === 'high' ? 8 : density === 'medium' ? 5 : 3;

            for (let i = 0; i < numBuildings; i++) {
                const width = Math.random() * 2 + 1.5;
                const depth = Math.random() * 2 + 1.5;
                let floors = density === 'high' ? Math.floor(Math.random() * 10) + 5 :
                    density === 'medium' ? Math.floor(Math.random() * 4) + 2 : 1;

                const floorHeight = 1.2;
                const height = floors * floorHeight;

                const px = bx + (Math.random() * (sizeX - width - 1) - (sizeX - width - 1) / 2);
                const pz = bz + (Math.random() * (sizeZ - depth - 1) - (sizeZ - depth - 1) / 2);

                const isGlassSkyscraper = Math.random() > 0.4 && density === 'high';
                const baseColor = isGlassSkyscraper ? "#60a5fa" : (['#e2e8f0', '#cbd5e1', '#f8fafc', '#f1f5f9'])[Math.floor(Math.random() * 4)];

                // Main Building Mesh (Ground to Top)
                blockElements.push(
                    <mesh key={`${blockGroupKey}-bldg-${i}`} position={[px, height / 2, pz]} castShadow receiveShadow>
                        <boxGeometry args={[width, height, depth]} />
                        {isGlassSkyscraper ? (
                            <meshPhysicalMaterial color={baseColor} transmission={0.7} opacity={1} metalness={0.9} roughness={0.1} />
                        ) : (
                            <meshStandardMaterial color={baseColor} roughness={0.8} metalness={0.1} />
                        )}
                    </mesh>
                )

                // Add a Setback / Top tier for high buildings
                if (floors > 5) {
                    const topWidth = width * 0.7;
                    const topDepth = depth * 0.7;
                    const topHeight = Math.random() * 3 + 1;
                    blockElements.push(
                        <mesh key={`${blockGroupKey}-top-${i}`} position={[px, height + topHeight / 2, pz]} castShadow receiveShadow>
                            <boxGeometry args={[topWidth, topHeight, topDepth]} />
                            {isGlassSkyscraper ? (
                                <meshPhysicalMaterial color={baseColor} transmission={0.8} roughness={0.1} />
                            ) : (
                                <meshStandardMaterial color={baseColor} roughness={0.8} />
                            )}
                        </mesh>
                    )

                    // Antenna
                    if (Math.random() > 0.5) {
                        blockElements.push(
                            <mesh key={`${blockGroupKey}-antenna-${i}`} position={[px, height + topHeight + 1, pz]} castShadow>
                                <cylinderGeometry args={[0.05, 0.05, 2]} />
                                <meshStandardMaterial color="#94a3b8" />
                            </mesh>
                        )
                        // Red flashing beacon
                        blockElements.push(
                            <mesh key={`${blockGroupKey}-beacon-${i}`} position={[px, height + topHeight + 2, pz]} castShadow>
                                <sphereGeometry args={[0.1, 8, 8]} />
                                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
                            </mesh>
                        )
                    }
                } else if (density !== 'high') {
                    // Pitched or flat detailed roof for smaller buildings
                    blockElements.push(
                        <mesh key={`${blockGroupKey}-roof-${i}`} position={[px, height + 0.1, pz]} castShadow receiveShadow>
                            <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
                            <meshStandardMaterial color="#475569" roughness={0.9} />
                        </mesh>
                    )
                }

                // Add some trees around the building
                if (Math.random() > 0.5) {
                    const treeX = px + (Math.random() > 0.5 ? width / 2 + 0.5 : -width / 2 - 0.5);
                    const treeZ = pz + (Math.random() > 0.5 ? depth / 2 + 0.5 : -depth / 2 - 0.5);
                    blockElements.push(
                        <group key={`tree-${blockGroupKey}-${i}`} position={[treeX, 0, treeZ]}>
                            <mesh position={[0, 0.5, 0]} castShadow>
                                <cylinderGeometry args={[0.08, 0.08, 1]} />
                                <meshStandardMaterial color="#78350f" />
                            </mesh>
                            <mesh position={[0, 1.2, 0]} castShadow>
                                <sphereGeometry args={[0.5, 8, 8]} />
                                <meshStandardMaterial color="#166534" roughness={0.9} />
                            </mesh>
                        </group>
                    )
                }
            }
            return blockElements;
        }

        // Fill City Blocks
        const blocks = [
            { x: 0, z: 0, w: 8, d: 8, type: 'high' },      // Downtown Center
            { x: -10, z: 0, w: 8, d: 8, type: 'high' },    // Downtown West
            { x: 10, z: 0, w: 8, d: 8, type: 'medium' },   // Commercial East
            { x: 0, z: -10, w: 8, d: 8, type: 'high' },    // Downtown North
            { x: 0, z: 10, w: 8, d: 8, type: 'high' },     // Downtown South
            { x: -10, z: -10, w: 8, d: 8, type: 'medium' },// Medium NW
            { x: 10, z: 10, w: 8, d: 8, type: 'low' },     // Res SE
            { x: -20, z: 0, w: 8, d: 8, type: 'medium' },  // Far West
            { x: 0, z: 20, w: 8, d: 8, type: 'medium' },   // Far South
            { x: 20, z: 0, w: 8, d: 8, type: 'low' },      // Far East
            { x: 20, z: 20, w: 8, d: 8, type: 'low' },     // Far SE
        ];

        blocks.forEach(b => {
            elements.push(...generateBlock(b.x, b.z, b.w, b.d, b.type));
        });

        // 8. TrueMap Scanning Satellite / Heli
        elements.push(
            <group key="drone" position={[0, 18, 0]}>
                <mesh castShadow>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={2} />
                </mesh>
                {/* Solar panels */}
                <mesh position={[1, 0, 0]} castShadow>
                    <boxGeometry args={[1.5, 0.05, 0.4]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[-1, 0, 0]} castShadow>
                    <boxGeometry args={[1.5, 0.05, 0.4]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Scanning Laser Cone */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
                    <cylinderGeometry args={[0.1, 8, 18, 32, 1, true]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
                </mesh>
            </group>
        )

        return elements
    }, [])

    return (
        <group ref={groupRef} position={[0, -2, 0]}>
            {cityElements}
        </group>
    )
}

export function ThreeDemo() {
    return (
        <div className="w-full h-full min-h-[500px] bg-slate-100 relative overflow-hidden rounded-3xl">
            <Canvas camera={{ position: [28, 22, 28], fov: 42 }} shadows>
                <fog attach="fog" args={['#f8fafc', 20, 90]} />

                {/* Beautiful Realistic Lighting Setup */}
                <ambientLight intensity={0.4} color="#e2e8f0" />
                <directionalLight
                    position={[30, 40, 20]}
                    intensity={1.5}
                    color="#fdf4ff"
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={100}
                    shadow-camera-left={-30}
                    shadow-camera-right={30}
                    shadow-camera-top={30}
                    shadow-camera-bottom={-30}
                    shadow-bias={-0.0005}
                />
                <directionalLight position={[-20, 20, -20]} intensity={0.5} color="#bae6fd" />

                {/* Realistic Skybox with Sun */}
                <Sky distance={450000} sunPosition={[30, 40, 20]} inclination={0.2} azimuth={0.25} />

                <CityMap />

                <Environment preset="city" />

                {/* Soft ground contact shadow for the whole city base */}
                <ContactShadows position={[0, -2.05, 0]} opacity={0.6} scale={100} blur={3} far={10} color="#000000" />

                <OrbitControls
                    enableZoom={true}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 2.1} // Prevent going under ground
                    minDistance={5}
                    maxDistance={75}
                    target={[0, 0, 0]}
                    enableDamping
                    dampingFactor={0.05}
                />
            </Canvas>

            {/* Overlay Map Legend */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-xl pointer-events-none text-sm font-medium z-10 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] border border-blue-400"></span>
                    <span className="text-slate-700">Scan Node (Satellite)</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] border border-amber-400"></span>
                    <span className="text-slate-700">International Airport</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.8)] border border-purple-400"></span>
                    <span className="text-slate-700">Retail / Mall Context</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)] border border-emerald-500"></span>
                    <span className="text-slate-700">Green Spaces / Parks</span>
                </div>
            </div>

            {/* Cinematic TrueMap Logo Overlay */}
            <div className="absolute top-6 right-6 font-mono text-xs text-slate-400 tracking-widest pointer-events-none bg-slate-900/5 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-200/20">
                TRUEMAPS™ ENGINE V2
            </div>
        </div>
    )
}
