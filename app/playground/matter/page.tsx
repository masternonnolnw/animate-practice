"use client";

import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";

const STATIC_DENSITY = 15;

const MatterStepTwo = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef(null);

  const [constraints, setContraints] = useState<DOMRect | null>(null);
  const [scene, setScene] = useState<any | null>(null);

  const handleResize = () => {
    const newConstraints = boxRef.current?.getBoundingClientRect();
    if (newConstraints) {
      setContraints(newConstraints);
    }
  };

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;
    let Runner = Matter.Runner;

    let engine = Engine.create({});

    let render = Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        background: "rgba(255, 0, 0, 0.5)",
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: "blue",
      },
    });

    const ball = Bodies.circle(150, 50, 50, {
      restitution: 0.9,
      render: {
        fillStyle: "yellow",
      },
    });

    World.add(engine.world, [floor, ball]);

    // run the engine
    Runner.run(engine);

    // run the renderer
    Render.run(render);

    const newConstraints = boxRef.current?.getBoundingClientRect();
    if (newConstraints) {
      setContraints(newConstraints);
    }

    setScene(render);

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("constraints", constraints);
    console.log("scene", scene);
    if (constraints && scene) {
      let { width, height } = constraints;

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      // Dynamically update floor
      const floor = scene.engine.world.bodies[0];

      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + STATIC_DENSITY / 2,
      });

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ]);
    }
  }, [scene, constraints]);

  return (
    <div
      style={{ position: "relative", border: "1px solid blue", padding: "8px" }}
    >
      <div style={{ textAlign: "center" }}>Checkout</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          rowGap: "16px",
          marginBottom: "32px",
        }}
      >
        <div>SubTitle</div>
        <div>£xxx</div>
        <div>Discount</div>
        <div>£xxx</div>
        <div>Total</div>
        <div>£xxx</div>
      </div>

      <button
        style={{
          cursor: "pointer",
          display: "block",
          textAlign: "center",
          marginBottom: "16px",
          width: "100%",
        }}
      >
        Checkout
      </button>

      <div
        ref={boxRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default MatterStepTwo;
