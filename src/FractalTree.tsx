import React, { useState, useEffect } from 'react';

type BranchProps = { // prop for branch
  x: number;
  y: number;
  angle: number;
  length: number;
  depth: number;
  maxDepth: number;
  branchAngle: number;
  scale: number;
  width: number;
  radius: number;
  colour: string;
  currentDepth: number;
};

const Branch: React.FC<BranchProps> = ({ // branch component
  x,
  y,
  angle,
  length,
  depth,
  maxDepth,
  branchAngle,
  scale,
  width,
  radius,
  colour,
  currentDepth,
}) => {
  // base cases of when current depth reaches or is grater than max depth or length is less than 2
  if (depth > currentDepth || length < 2) return null; 
  if (depth > maxDepth) return null; 

  // calculate x and y coordinates of the end of the branch
  const x2 = x + length * Math.cos(angle); 
  const y2 = y + length * Math.sin(angle);

  // style and design for the branch
  const branchStyle: React.CSSProperties = { 
    position: 'absolute',
    left: x,
    top: y,
    width: length,
    height: width,
    background: '#000',
    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
    transformOrigin: '0 50%',
    borderRadius: width / 2,
  };

  const numLeaves = Math.floor(Math.random() * 5) + 1; 
  const leaves = [];

  // create the leaves as a map
  for (let i = 1; i <= numLeaves; i++) { 
    const t = Math.random();
    const leafX = x + (x2 - x) * t;
    const leafY = y + (y2 - y) * t;
    leaves.push(
      <div 
        key={`leaf-${i}`}
        style={{
          position: 'absolute',
          left: leafX - radius,
          top: leafY - radius,
          width: radius * 2,
          height: radius * 2,
          background: colour,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    );
  }

  const split = (branchAngle * Math.PI) / 180;
  const nextLength = length * scale / 100;
  // return the branch component and recall the 2 branches
  return ( 
    <>
      <div style={branchStyle} />
      {leaves}
      <Branch
        x={x2}
        y={y2}
        angle={angle - split}
        length={nextLength}
        depth={depth + 1}
        maxDepth={maxDepth}
        branchAngle={branchAngle}
        scale={scale}
        width={width}
        radius={radius}
        colour={colour}
        currentDepth={currentDepth}
      />
      <Branch
        x={x2}
        y={y2}
        angle={angle + split}
        length={nextLength}
        depth={depth + 1}
        maxDepth={maxDepth}
        branchAngle={branchAngle}
        scale={scale}
        width={width}
        radius={radius}
        colour={colour}
        currentDepth={currentDepth}
      />
    </>
  );
};

const FractalTree = () => {
  // changeable variables for the tree 
  const [depth, setDepth] = useState(8); 
  const [animating, setAnimating] = useState(false);
  const [currentDepth, setCurrentDepth] = useState(8);
  const [length, setLength] = useState(100);
  const [angle, setAngle] = useState(30);
  const [width, setWidth] = useState(2);
  const [scale, setScale] = useState(70);
  const [radius, setRadius] = useState(5);
  const [colour, setColour] = useState<`#${string}`>('#228B22');
  const [animationSpeed, setAnimationSpeed] = useState(300);

  useEffect(() => { // animation effect
    if (!animating) return;
    if (currentDepth >= depth) {
      setAnimating(false);
      return;
    }
    // set the animation speed and increment the current depth
    const timeout = setTimeout(() => { 
      setCurrentDepth((d) => d + 1);
    }, animationSpeed);
    return () => clearTimeout(timeout);
  }, [animating, currentDepth, depth, animationSpeed]);

  // start animation function
  const handleStartAnimation = () => {
    if (currentDepth === depth) {
      setCurrentDepth(0);
    }
    setAnimating(true);
  };

  const handlePauseAnimation = () => {
    setAnimating(false);
  };

  // functions for the changeable variables
  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const newDepth = parseInt(e.target.value, 10);
    setDepth(newDepth);
    setCurrentDepth(newDepth);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value, 10);
    setLength(newLength);
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = parseInt(e.target.value, 10);
    setAngle(newAngle);
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);
    setWidth(newWidth);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    setRadius(newRadius);
  };

  const handleColourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColour = e.target.value as `#${string}`;
    setColour(newColour);
  };

  const handleAnimationSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnimationSpeed = parseInt(e.target.value, 10);
    setAnimationSpeed(newAnimationSpeed);
  };

  // reset the tree
  const resetTree = () => { 
    setCurrentDepth(0);
    setAnimating(false);
  };

  // return the base tree and buttons
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Depth:
          <input type="number" min={4} max={12} value={depth} onChange={handleDepthChange} style={{ width: 50 }} />
        </label>
        <label>
          Branch Length:
          <input type="number" min={60} max={180} value={length} onChange={handleLengthChange} style={{ width: 50 }} />
        </label>
        <label>
          Branch Angle:
          <input type="number" min={10} max={45} value={angle} onChange={handleAngleChange} style={{ width: 50 }} />
        </label>
        <label>
          Branch Width:
          <input type="number" min={1} max={10} value={width} onChange={handleWidthChange} style={{ width: 50 }} />
        </label>
        <label>
          Scale Factor:
          <input type="number" min={50} max={85} value={scale} onChange={handleScaleChange} style={{ width: 50 }} />
        </label>
        <label>
          Leaf Radius:
          <input type="number" min={2} max={8} value={radius} onChange={handleRadiusChange} style={{ width: 50 }} />
        </label>
        <label>
          Leaf Colour:
          <input type="color" value={colour} onChange={handleColourChange} style={{ width: 50 }} />
        </label>
        <label>
          Animation Speed(ms):
          <input type="number" min={200} max={5000} value={animationSpeed} onChange={handleAnimationSpeedChange} style={{ width: 50 }} />
        </label>
        <button onClick={handleStartAnimation} style={{ marginLeft: 20 }} disabled={animating}>
          Start Animation
        </button>
        <button onClick={handlePauseAnimation} style={{ marginLeft: 20 }} disabled={!animating}>
          Pause Animation
        </button>
        <button onClick={resetTree} style={{ marginLeft: 20 }}>
          Reset Tree
        </button>
      </div>
      {/* styles and borders for the overall tree */}
      <div
        style={{
          margin: 'auto',
          position: 'relative',
          width: 1000,
          height: 800,
          border: '1px solid #ccc',
          overflow: 'visible',
        }}
      >
        {/* base tree for depth 1*/}
        <Branch
          x={500}
          y={700}
          angle={-Math.PI / 2}
          length={length}
          depth={1}
          maxDepth={depth}
          branchAngle={angle}
          scale={scale}
          width={width}
          radius={radius}
          colour={colour}
          currentDepth={currentDepth}
        />
      </div>
    </div>
  );
};

export default FractalTree;