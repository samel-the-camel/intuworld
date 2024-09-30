import React, { useCallback, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const ForceGraph = ({ onNodeClick }) => {
  const fgRef = useRef();

  const data = {
    nodes: [
      { id: "life", color: "#e6194B" },
      { id: "goals", color: "#3cb44b" },
      { id: "influence", color: "#ffe119" },
      { id: "art", color: "#4363d8" },
      { id: "psychology", color: "#f58231" }
    ],
    links: [
      { source: "life", target: "goals" },
      { source: "life", target: "influence" },
      { source: "goals", target: "psychology" },
      { source: "influence", target: "art" },
      { source: "art", target: "psychology" }
    ]
  };

  const handleNodeClick = useCallback((node) => {
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );

    setTimeout(() => onNodeClick(node.id), 3000);
  }, [onNodeClick]);

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={data}
      nodeLabel="id"
      nodeColor={node => node.color}
      nodeRelSize={6}
      onNodeClick={handleNodeClick}
      linkColor={() => "rgba(255,255,255,0.2)"}
      backgroundColor="rgba(0,0,0,0)"
      width={800}
      height={600}
      nodeThreeObject={node => {
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({color: node.color}));
        sprite.scale.set(12, 12, 1);
        return sprite;
      }}
    />
  );
};

export default ForceGraph;