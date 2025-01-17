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
      force: { x: 0.2, y: 0.01 },
    });
    const ball2 = Bodies.circle(150, 50, 50, {
      restitution: 0.9,
      render: {
        fillStyle: "blue",
      },
      force: { x: 0.2, y: 0.01 },
    });

    World.add(engine.world, [floor, ball, ball2]);

    // add keyboard to add force to ball when press w a s d
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          Matter.Body.applyForce(ball, ball.position, { x: 0, y: -0.05 });
          break;
        case "a":
          Matter.Body.applyForce(ball, ball.position, { x: -0.05, y: 0 });
          break;
        case "s":
          Matter.Body.applyForce(ball, ball.position, { x: 0, y: 0.05 });
          break;
        case "d":
          Matter.Body.applyForce(ball, ball.position, { x: 0.05, y: 0 });
          break;
        case "ArrowUp":
          Matter.Body.applyForce(ball2, ball2.position, { x: 0, y: -0.05 });
          break;
        case "ArrowLeft":
          Matter.Body.applyForce(ball2, ball2.position, { x: -0.05, y: 0 });
          break;
        case "ArrowDown":
          Matter.Body.applyForce(ball2, ball2.position, { x: 0, y: 0.05 });
          break;
        case "ArrowRight":
          Matter.Body.applyForce(ball2, ball2.position, { x: 0.05, y: 0 });
          break;
      }
    });

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

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
          pointerEvents: "none",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default MatterStepTwo;
