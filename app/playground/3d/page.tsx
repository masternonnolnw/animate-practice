"use client";

import { Canvas, Euler } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";

function App() {
  const burger = useFBX("/model/burger.fbx");

  // move burger to new position
  // const moveBurgerToNewPosition = (x = 0, y = 0, z = 0) => {
  //   burger.position.set(x, y, z);
  // };

  const currentPos = burger.position;

  const [lockMovement, setLockMovement] = useState(false);

  // use frammer motion to animate position smoothly
  const moveTo = (x = currentPos.x, y = currentPos.y, z = currentPos.z) => {
    if (lockMovement) return;
    setLockMovement(true);
    const targetPos = { x, y, z };

    animate(currentPos.x, x, {
      onUpdate: (latest) => {
        burger.position.setX(latest);
      },
      duration: 0.5,
      onComplete: () => {
        setLockMovement(false);
      },
      type: "keyframes",
    });

    animate(currentPos.y, y, {
      onUpdate: (latest) => {
        burger.position.setY(latest);
      },
      duration: 0.5,
      onComplete: () => {
        setLockMovement(false);
      },
      type: "keyframes",
    });

    animate(currentPos.z, z, {
      onUpdate: (latest) => {
        burger.position.setZ(latest);
      },
      duration: 0.5,
      onComplete: () => {
        setLockMovement(false);
      },
      type: "keyframes",
    });

    if (y < currentPos.y) {
      animate(burger.rotation.x, burger.rotation.x + 2 * Math.PI, {
        onUpdate: (latest) => {
          burger.rotation.x = latest;
        },
        duration: 0.5,
        onComplete: () => {
          setLockMovement(false);
        },
        type: "keyframes",
      });
    } else if (y > currentPos.y) {
      animate(burger.rotation.x, burger.rotation.x - 2 * Math.PI, {
        onUpdate: (latest) => {
          burger.rotation.x = latest;
        },
        duration: 0.5,
        onComplete: () => {
          setLockMovement(false);
        },
        type: "keyframes",
      });
    }

    if (x < currentPos.x) {
      animate(burger.rotation.y, burger.rotation.y - 2 * Math.PI, {
        onUpdate: (latest) => {
          burger.rotation.y = latest;
        },
        duration: 0.5,
        onComplete: () => {
          setLockMovement(false);
        },
        type: "keyframes",
      });
    } else if (x > currentPos.x) {
      animate(burger.rotation.y, burger.rotation.y + 2 * Math.PI, {
        onUpdate: (latest) => {
          burger.rotation.y = latest;
        },
        duration: 0.5,
        onComplete: () => {
          setLockMovement(false);
        },
        type: "keyframes",
      });
    }
  };

  // call move fron W,A,S,D
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "w") {
        moveTo(currentPos.x, currentPos.y + 1, currentPos.z);
      }
      if (e.key === "s") {
        moveTo(currentPos.x, currentPos.y - 1, currentPos.z);
      }
      if (e.key === "a") {
        moveTo(currentPos.x - 1, currentPos.y, currentPos.z);
      }
      if (e.key === "d") {
        moveTo(currentPos.x + 1, currentPos.y, currentPos.z);
      }
    });
  }, []);

  return (
    <div className="min-h-screen h-[100svh] relative">
      {/* set move to left right front and back */}
      <div className="absolute top-10 left-2 p-4 z-10">
        <Button
          className="absolute top-[75px] left-[0px]"
          onClick={() => moveTo(currentPos.x - 1, currentPos.y, currentPos.z)}
          disabled={lockMovement}
        >
          Move Left
        </Button>
        <Button
          className="absolute top-[75px] left-[150px]"
          onClick={() => moveTo(currentPos.x + 1, currentPos.y, currentPos.z)}
          disabled={lockMovement}
        >
          Move Right
        </Button>
        <Button
          className="absolute top-0 left-[75px]"
          onClick={() => moveTo(currentPos.x, currentPos.y + 1, currentPos.z)}
          disabled={lockMovement}
        >
          Move Up
        </Button>
        <Button
          className="absolute top-[150px] left-[75px]"
          onClick={() => moveTo(currentPos.x, currentPos.y - 1, currentPos.z)}
          disabled={lockMovement}
        >
          Move Down
        </Button>
      </div>

      <Canvas camera={{ fov: 30 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0.5, -1]} distance={1} intensity={2} />
        <directionalLight position={[-10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, 0]} intensity={1} />
        {/* <Box args={[1, 1, 1]} visible>
          <meshStandardMaterial attach="material" color="hotpink" />
        </Box> */}
        <mesh>
          {/* <OrbitControls /> */}
          <primitive object={burger} scale={0.001} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
