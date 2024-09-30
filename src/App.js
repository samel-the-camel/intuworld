import React, { useState } from 'react';
import ForceGraph from './ForceGraph';
import PostContent from './PostContent';
import './App.css';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Intu World</h1>
        <h4>beautiful, incredible pain</h4>
        <h5>my goal for this: to use neurolinguistic programming techniques to arrange these node maps in such a way so that each post posted, each idea conveyed has a problem, goal, example(maybe), benefit, process, and concept described and presented and positioned in the most effective way possible so that we see the final implementation in our minds as clearly as possible</h5>
      </header>
      <main>
        <div className="graph-container">
          <ForceGraph onNodeClick={setSelectedPost} />
        </div>
        {selectedPost && <PostContent post={selectedPost} />}
      </main>
    </div>
  );
}

export default App;