import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';
import { useTimer } from '../context/TimerContext';

const toAndFro = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const SceneContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
`;

const Timer = styled.div`
  font-size: 2rem;
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #282c34;
  font-weight: bold;
  background: #f0f0f0;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Cube = () => {
  const mesh = useRef();
  const { timeLeft } = useTimer();
  const [rotation, setRotation] = useState(false);

  useFrame(() => {
    if (rotation) {
      mesh.current.rotation.x += 0.1;
      mesh.current.rotation.y += 0.1;
    } else {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setRotation(true);
      setTimeout(() => {
        setRotation(false);
        const randomRotation = Math.floor(Math.random() * 4) * Math.PI / 2;
        mesh.current.rotation.x = randomRotation;
        mesh.current.rotation.y = randomRotation;
      }, 2000);
    }
  }, [timeLeft]);

  return (
    <mesh ref={mesh} position={[4, 0, 0]} animation={toAndFro}>
      <boxGeometry args={[2, 2, 2]} />
      {Array.from({ length: 6 }).map((_, i) => (
        <meshStandardMaterial attach={`material-${i}`} key={i} color="orange">
          <canvasTexture attach="map" image={drawTextOnCanvas(i + 1)} />
        </meshStandardMaterial>
      ))}
    </mesh>
  );
};

const drawTextOnCanvas = (text) => {
  const size = 512;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  context.fillStyle = 'orange';
  context.fillRect(0, 0, size, size);
  context.fillStyle = 'white';
  context.font = 'bold 200px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, size / 2, size / 2);
  return canvas;
};

const Coin = () => {
  const mesh = useRef();
  const { timeLeft } = useTimer();
  const [flip, setFlip] = useState(false);

  useFrame(() => {
    if (flip) {
      mesh.current.rotation.x += 0.1;
    } else {
      mesh.current.rotation.x = Math.PI / 2;
    }
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setFlip(true);
      setTimeout(() => {
        setFlip(false);
        const isHeads = Math.random() > 0.5;
        mesh.current.rotation.x = isHeads ? 0 : Math.PI;
        mesh.current.rotation.y = 0;
      }, 2000);
    }
  }, [timeLeft]);

  return (
    <mesh ref={mesh} position={[-4, 0, 0]} animation={toAndFro}>
      <cylinderGeometry args={[1, 1, 0.1, 32]} />
      <meshStandardMaterial color={'gold'}>
        <canvasTexture attach="map" image={drawCoinFace('H')} />
      </meshStandardMaterial>
      <meshStandardMaterial color={'gold'}>
        <canvasTexture attach="map" image={drawCoinFace('T')} />
      </meshStandardMaterial>
    </mesh>
  );
};

const drawCoinFace = (text) => {
  const size = 512;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  context.fillStyle = 'gold';
  context.fillRect(0, 0, size, size);
  context.fillStyle = 'black';
  context.font = 'bold 300px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, size / 2, size / 2);
  return canvas;
};

function CubePage() {
  const { timeLeft } = useTimer();

  return (
    <Container>
      <Timer>
        Time left: {timeLeft}s
      </Timer>
      <SceneContainer>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Coin />
          <Cube />
        </Canvas>
      </SceneContainer>
    </Container>
  );
}

export default CubePage;
