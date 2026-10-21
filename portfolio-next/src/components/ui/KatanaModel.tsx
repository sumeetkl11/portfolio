"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Skill } from "@/types";

interface KatanaModelProps {
  skill: Skill;
  position: [number, number, number];
  scale: number;
  slotDelta: number;
  isHovered: boolean;
  isCenter: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  tiltAngle?: number;
}

// ── Mathematical constants for authentic Katana circular arc ──
const ARC_RADIUS = 3.880;
const ARC_YC = -3.856;
const ARC_ZC = -0.362;
// Subtle unsheathe: exposes golden habaki collar and cutting steel edge
const MAX_SUBTLE_DRAW = 0.26;

export default function KatanaModel({
  skill,
  position,
  scale,
  slotDelta,
  isHovered,
  isCenter,
  onHoverStart,
  onHoverEnd,
  onClick,
  tiltAngle = 37,
}: KatanaModelProps) {
  const parentRef = useRef<THREE.Group>(null);
  const swordGroupRef = useRef<THREE.Group | null>(null);
  const bladeGlowRef = useRef<THREE.PointLight>(null);

  const gltf = useGLTF("/models/katana.glb");

  // ── Build isolated SwordGroup and ScabbardGroup with unique cloned materials ──
  const { swordGroup, scabbardGroup } = useMemo(() => {
    const swordParts = new Set([
      "Katana_Blade",
      "Tsuba",
      "Habaki",
      "Seppa_Front",
      "Seppa_Back",
      "Fuchi",
      "Tsuka_Core",
      "Tsuka_Ito",
      "Menuki",
      "Kashira",
    ]);

    const scabbardParts = new Set([
      "Saya",
      "Kojiri",
      "Kurikata",
      "Shitodome",
      "Sageo",
    ]);

    const sGroup = new THREE.Group();
    sGroup.name = "SwordGroup";
    const scGroup = new THREE.Group();
    scGroup.name = "ScabbardGroup";

    // Clone GLTF hierarchy so every skill katana has independent meshes and materials
    const cloned = gltf.scene.clone(true);

    // Compute custom scabbard lacquer shade per skill
    const baseColor = new THREE.Color(skill.color);
    // Dark deep lacquer tint based on skill
    const scabbardLacquer = new THREE.Color("#07080a").lerp(baseColor, 0.12);

    // Enhance and customize materials per skill
    cloned.traverse((child: THREE.Object3D) => {
      const nameLower = child.name.toLowerCase();

      // ── MESH CLEANUP: Remove yellow sticks / loop meshes ──
      // Hide any stray yellow sticks, loops, or shitodome eyelets, while strictly keeping Sageo (rope)
      if (
        nameLower.includes("stick") ||
        nameLower.includes("loop") ||
        child.name === "Shitodome" ||
        (nameLower.includes("yellow") && child.name !== "Habaki" && child.name !== "Seppa_Front" && child.name !== "Seppa_Back")
      ) {
        child.visible = false;
        return;
      }

      // Explicitly keep rope (Sageo) visible
      if (child.name === "Sageo") {
        child.visible = true;
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // Clone material so each katana has independent color/emissive styling
          mesh.material = (mesh.material as THREE.Material).clone();
          const mat = mesh.material as THREE.MeshStandardMaterial;

          if (mesh.name === "Katana_Blade") {
            // Mirror steel cutting edge with faint skill reflection
            mat.metalness = 0.98;
            mat.roughness = 0.06;
            mat.color = new THREE.Color("#f8fafc");
            mat.emissive = baseColor.clone().multiplyScalar(0.06);
            mat.envMapIntensity = 3.2;
            mesh.castShadow = true;
          } else if (["Habaki", "Seppa_Front", "Seppa_Back"].includes(mesh.name)) {
            // Authentic polished gold brass collar and spacers
            mat.metalness = 0.94;
            mat.roughness = 0.16;
            mat.color = new THREE.Color("#e8c258");
            mat.envMapIntensity = 2.4;
          } else if (mesh.name === "Tsuba") {
            // Hand guard: forged black iron with subtle skill rim luster
            mat.metalness = 0.90;
            mat.roughness = 0.25;
            mat.color = new THREE.Color("#22201e");
            mat.emissive = baseColor.clone().multiplyScalar(0.04);
            mat.envMapIntensity = 1.8;
          } else if (mesh.name === "Tsuka_Ito") {
            // Silk braided handle wrap: dynamically tinted in skill brand color
            mat.color = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.15);
            mat.roughness = 0.45;
            mat.metalness = 0.12;
            mat.emissive = baseColor.clone().multiplyScalar(0.18);
          } else if (mesh.name === "Tsuka_Core") {
            // Samegawa (rayskin hilt core): clean pearl white
            mat.color = new THREE.Color("#eae8e4");
            mat.roughness = 0.70;
            mat.metalness = 0.05;
          } else if (mesh.name === "Saya") {
            // Urushi deep lacquer with custom skill undertone
            mat.color = scabbardLacquer;
            mat.metalness = 0.28;
            mat.roughness = 0.08;
            mat.emissive = baseColor.clone().multiplyScalar(0.05);

            // Bold, substantial scabbard cross-section
            mesh.scale.set(1.30, 1.24, 1.0);
          } else if (mesh.name === "Sageo") {
            // Woven Sageo scabbard cord: matched skill accent color
            mat.color = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.22);
            mat.roughness = 0.65;
            mat.metalness = 0.08;
            mat.emissive = baseColor.clone().multiplyScalar(0.12);
          }
        }
      }
    });

    const toMove: THREE.Mesh[] = [];
    cloned.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        toMove.push(child as THREE.Mesh);
      }
    });

    toMove.forEach((mesh) => {
      if (swordParts.has(mesh.name)) {
        sGroup.add(mesh);
      } else if (scabbardParts.has(mesh.name)) {
        scGroup.add(mesh);
      }
    });

    // Exact concentric offset so scabbard mouth meets the Habaki & Tsuba
    scGroup.position.y = 0.0858;

    return { swordGroup: sGroup, scabbardGroup: scGroup };
  }, [gltf.scene, skill.color]);

  // Animation state values
  const anim = useRef({
    parentLift: 0,
    swordProgress: 0,
    _parentLift: 0,
    _swordProgress: 0,
    _glowIntensity: 0,
    curX: position[0],
    curY: position[1],
    curZ: position[2],
    curScale: scale,
  });

  const tiltRad = THREE.MathUtils.degToRad(tiltAngle);
  // Subtle Coverflow inward yaw: side katanas orient gently toward center
  const yawAngle = THREE.MathUtils.degToRad(-slotDelta * 5.5);

  useFrame((_state, delta) => {
    const a = anim.current;
    const activeSwordGroup = swordGroupRef.current;
    if (!activeSwordGroup) return;

    const t = 1 - Math.exp(-12 * delta);
    const carouselLerp = 1 - Math.exp(-14 * delta);

    // ── Carousel position and scale smooth interpolation ──
    a.curX = THREE.MathUtils.lerp(a.curX, position[0], carouselLerp);
    a.curY = THREE.MathUtils.lerp(a.curY, position[1], carouselLerp);
    a.curZ = THREE.MathUtils.lerp(a.curZ, position[2], carouselLerp);
    a.curScale = THREE.MathUtils.lerp(a.curScale, scale, carouselLerp);

    if (parentRef.current) {
      parentRef.current.position.set(
        a.curX + a._parentLift * Math.sin(tiltRad),
        a.curY + a._parentLift * Math.cos(tiltRad),
        a.curZ
      );
      parentRef.current.scale.setScalar(a.curScale);
    }

    // ── Strictly the active center Katana is drawn (Instant, zero-lag response) ──
    const shouldDraw = isCenter || isHovered;

    if (shouldDraw) {
      // Gentle lift and immediate synchronized blade reveal
      a.parentLift = 0.20;
      a.swordProgress = MAX_SUBTLE_DRAW;
    } else {
      a.swordProgress = 0;
      a.parentLift = 0;
    }

    // Responsive physics-based smooth lerping
    a._parentLift = THREE.MathUtils.lerp(a._parentLift, a.parentLift, t);
    a._swordProgress = THREE.MathUtils.lerp(a._swordProgress, a.swordProgress, t);
    a._glowIntensity = THREE.MathUtils.lerp(
      a._glowIntensity,
      a._swordProgress > 0.04 ? 2.5 : 0,
      t
    );

    // ── Mathematical Circular Arc Kinematics (Zero Scabbard Clipping) ──
    const s = a._swordProgress;
    const dTheta = s / ARC_RADIUS;
    const arcY = ARC_YC + (-ARC_YC * Math.cos(dTheta) + ARC_ZC * Math.sin(dTheta));
    const arcZ = ARC_ZC + (-ARC_YC * Math.sin(dTheta) - ARC_ZC * Math.cos(dTheta));

    activeSwordGroup.position.y = arcY;
    activeSwordGroup.position.z = arcZ;
    activeSwordGroup.rotation.x = dTheta;

    if (bladeGlowRef.current) {
      bladeGlowRef.current.intensity = a._glowIntensity;
    }
  });

  return (
    <group ref={parentRef}>
      {/* ── Orientation Group: Tilted at 37° with Coverflow inward yaw ── */}
      <group
        rotation={[-Math.PI / 2, yawAngle, -tiltRad]}
        rotation-order="ZYX"
      >
        {/* Generous Hit-target box along the diagonal sword spine */}
        <mesh
          visible={false}
          position={[0, 0, -0.2]}
          onPointerEnter={(e) => {
            e.stopPropagation();
            onHoverStart();
          }}
          onPointerLeave={() => onHoverEnd()}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <boxGeometry args={[0.60, 0.60, 3.0]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Thickened, Clean Scabbard (Zero yellow sticks/loops) */}
        <primitive object={scabbardGroup} />

        {/* SwordGroup: Blade, Guard, and Handle move together along the circular arc */}
        <primitive ref={swordGroupRef} object={swordGroup}>
          {/* Subtle blade glow light in skill's brand color */}
          <pointLight
            ref={bladeGlowRef}
            position={[0, 0, -0.25]}
            color={skill.color}
            distance={2.8}
            intensity={0}
            decay={2}
          />
        </primitive>
      </group>
    </group>
  );
}

useGLTF.preload("/models/katana.glb");
