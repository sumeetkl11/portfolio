"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { KatanaSkill } from "@/types";

interface KatanaModelProps {
  skill: KatanaSkill;
  position: [number, number, number];
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  getLabelEl: () => HTMLDivElement | null;
  tiltAngle?: number; // tilt towards right in degrees (45° to 70°)
}

// ── Blade Curvature Constants (Fitted to authentic model arc) ──
const ARC_RADIUS = 3.880;
const ARC_ZC = -0.362;
const ARC_YC = -3.856;

export default function KatanaModel({
  skill,
  position,
  isHovered,
  onHoverStart,
  onHoverEnd,
  getLabelEl,
  tiltAngle = 48,
}: KatanaModelProps) {
  const parentRef = useRef<THREE.Group>(null);
  const swordGroupRef = useRef<THREE.Group>(null);
  const bladeGlowRef = useRef<THREE.PointLight>(null);
  const anchorRef = useRef<THREE.Group>(null);

  // Load authentic GLB model
  const gltf = useGLTF("/models/katana.glb");

  // Build isolated SwordGroup and ScabbardGroup
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

    // Clone GLTF hierarchy
    const cloned = gltf.scene.clone(true);

    // Enhance materials for rich PBR reflections and steel glints
    cloned.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
          const mat = mesh.material as THREE.MeshStandardMaterial;

          if (mesh.name === "Katana_Blade") {
            // High metalness mirror steel with specular glints
            mat.metalness = 0.98;
            mat.roughness = 0.08;
            mat.color = new THREE.Color("#f4f6fb");
            mat.envMapIntensity = 2.8;
            mesh.castShadow = true;
          } else if (["Habaki", "Seppa_Front", "Seppa_Back"].includes(mesh.name)) {
            // Polished gold brass collar and spacers
            mat.metalness = 0.92;
            mat.roughness = 0.18;
            mat.color = new THREE.Color("#e8c258");
            mat.envMapIntensity = 2.0;
          } else if (mesh.name === "Tsuba") {
            // Hand guard (patinated black iron)
            mat.metalness = 0.88;
            mat.roughness = 0.28;
            mat.color = new THREE.Color("#3c3630");
            mat.envMapIntensity = 1.6;
          } else if (mesh.name === "Saya") {
            // Deep Urushi black lacquer with glossy finish
            mat.metalness = 0.18;
            mat.roughness = 0.06;
            mat.color = new THREE.Color("#08080a");

            // Thicken the scabbard so blade is fully covered without clipping
            mesh.scale.set(1.24, 1.18, 1.0);
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

    // Exact concentric offset so scabbard opening meets the Habaki & Tsuba
    scGroup.position.y = 0.0858;

    // ── Add decorative golden accent rings (Semegane) on the scabbard ──
    const goldMat = new THREE.MeshStandardMaterial({
      color: "#d4af37",
      metalness: 0.9,
      roughness: 0.2,
    });

    // Koiguchi collar ring (near opening)
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.038, 0.003, 8, 24),
      goldMat
    );
    ring1.position.set(0, 0, -0.04);
    scGroup.add(ring1);

    // Mid-scabbard accent ring
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.034, 0.0025, 8, 24),
      goldMat
    );
    ring2.position.set(0, 0, -0.28);
    scGroup.add(ring2);

    return { swordGroup: sGroup, scabbardGroup: scGroup };
  }, [gltf.scene]);

  swordGroupRef.current = swordGroup;

  // Animation values
  const anim = useRef({
    parentLift: 0,
    swordProgress: 0,
    textOpacity: 0,
    _parentLift: 0,
    _swordProgress: 0,
    _textOpacity: 0,
    _glowIntensity: 0,
  });

  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const tiltRad = useMemo(() => THREE.MathUtils.degToRad(tiltAngle), [tiltAngle]);

  useFrame(({ camera, size }, delta) => {
    const a = anim.current;
    const t = 1 - Math.pow(0.001, delta);

    if (isHovered) {
      // Step 1: Katana lifts up slightly
      a.parentLift = 0.32;
      // Step 2: Blade unsheathes along the circular arc
      a.swordProgress = a._parentLift > 0.18 ? 0.74 : 0;
      // Step 3: Skill text fades in once blade is drawn
      a.textOpacity = a._swordProgress > 0.48 ? 1 : 0;
    } else {
      // Reverse cascade: hide text -> sheath blade -> lower katana
      a.textOpacity = 0;
      a.swordProgress = a._textOpacity < 0.08 ? 0 : a.swordProgress;
      a.parentLift = a._swordProgress < 0.08 ? 0 : a.parentLift;
    }

    // Smooth lerping
    a._parentLift = THREE.MathUtils.lerp(a._parentLift, a.parentLift, t);
    a._swordProgress = THREE.MathUtils.lerp(a._swordProgress, a.swordProgress, t);
    a._textOpacity = THREE.MathUtils.lerp(a._textOpacity, a.textOpacity, t * 1.5);
    a._glowIntensity = THREE.MathUtils.lerp(
      a._glowIntensity,
      a._textOpacity > 0.2 ? 3.5 : 0,
      t
    );

    // Apply parent lift (along diagonal or vertical)
    if (parentRef.current) {
      parentRef.current.position.y = a._parentLift * Math.cos(tiltRad);
      parentRef.current.position.x = a._parentLift * Math.sin(tiltRad);
    }

    // ── Mathematical Circular Arc Kinematics (Zero Scabbard Clipping) ──
    const s = a._swordProgress;
    const dTheta = s / ARC_RADIUS;
    const arcY = ARC_YC + (-ARC_YC * Math.cos(dTheta) + ARC_ZC * Math.sin(dTheta));
    const arcZ = ARC_ZC + (-ARC_YC * Math.sin(dTheta) - ARC_ZC * Math.cos(dTheta));

    swordGroup.position.y = arcY;
    swordGroup.position.z = arcZ;
    swordGroup.rotation.x = dTheta;

    if (bladeGlowRef.current) {
      bladeGlowRef.current.intensity = a._glowIntensity;
    }

    // ── 2D Screen Projection for HTML Text Overlay via Vector3.project(camera) ──
    const labelEl = getLabelEl();
    if (labelEl && anchorRef.current) {
      anchorRef.current.getWorldPosition(tempVec);
      tempVec.project(camera);

      if (tempVec.z <= 1) {
        const screenX = ((tempVec.x + 1) / 2) * size.width;
        const screenY = ((-tempVec.y + 1) / 2) * size.height;

        labelEl.style.transform = `translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(1)}px, 0) translate(-50%, -100%) translateY(-16px)`;
        labelEl.style.opacity = a._textOpacity.toFixed(3);
      } else {
        labelEl.style.opacity = "0";
      }
    }
  });

  return (
    <group position={position}>
      {/* ── Parent Group: lifts smoothly on hover ── */}
      <group ref={parentRef}>

        {/* ── Orientation Group: Tilted to the right at 45°–50° with enlarged scale ── */}
        <group
          scale={[3.6, 3.6, 3.6]}
          rotation={[-Math.PI / 2, 0.35, -tiltRad]}
          rotation-order="ZYX"
        >
          {/* Hit-target box oriented along the diagonal katana spine (sized to avoid overlap) */}
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
              if (isHovered) onHoverEnd();
              else onHoverStart();
            }}
          >
            <boxGeometry args={[0.45, 0.45, 2.6]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>

          {/* Thickened Scabbard (stays anchored) */}
          <primitive object={scabbardGroup} />

          {/* SwordGroup: Blade, Guard, and Handle move together along the circular arc */}
          <primitive object={swordGroup}>
            {/* Blade glow light in skill's brand color */}
            <pointLight
              ref={bladeGlowRef}
              position={[0, 0, -0.35]}
              color={skill.color}
              distance={3.5}
              intensity={0}
              decay={2}
            />

            {/* Text anchor positioned above the weapon handle */}
            <group ref={anchorRef} position={[0, 0, 0.42]} />
          </primitive>
        </group>

      </group>
    </group>
  );
}

useGLTF.preload("/models/katana.glb");
