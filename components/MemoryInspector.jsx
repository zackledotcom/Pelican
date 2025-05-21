2
import React from "react";
// Update import to use the new context location and custom hook
import { useMemory } from "../context/MemoryContext";

export function MemoryInspector() {
  // Use the custom hook instead of useContext directly
  const { 
    memoryHits, 
    tokenUsage, 
    maxTokens, 
    pinMemory, 
    unpinMemory 
  } = useMemory();
  
  return (
    <div className="memory-inspector">
      <header>
        <h2>Memory Inspector</h2>
        <div className="token-usage">
          <span>{tokenUsage} / {maxTokens} tokens</span>
        </div>
      </header>
      <div className="memory-hits">
        {memoryHits.length === 0 ? (
          <p className="empty-state">No memory hits available</p>
        ) : (
          <ul>
            {memoryHits.map(hit => (
              <li key={hit.id} className={hit.pinned ? "pinned" : ""}>
                <div className="hit-content">{hit.content}</div>
                <div className="hit-actions">
                  <button 
                    onClick={() => hit.pinned ? unpinMemory(hit.id) : pinMemory(hit.id)}
                  >
                    {hit.pinned ? "Unpin" : "Pin"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
 import to use the new context location and custom hook
import { useMemory } from "../context/MemoryContext";

export function MemoryInspector() {
  // Use the custom hook instead of useContext directly
  const { 
    memoryHits, 
    tokenUsage, 
    maxTokens, 
    pinMemory, 
    unpinMemory 
  } = useMemory();
  
  return (
    <div className="memory-inspector">
      <header>
        <h2>Memory Inspector</h2>
        <div className="token-usage">
          <span>{tokenUsage} / {maxTokens} tokens</span>
        </div>
      </header>
      <div className="memory-hits">
        {memoryHits.length === 0 ? (
          <p className="empty-state">No memory hits available</p>
        ) : (
          <ul>
            {memoryHits.map(hit => (
              <li key={hit.id} className={hit.pinned ? "pinned" : ""}>
                <div className="hit-content">{hit.content}</div>
                <div className="hit-actions">
                  <button 
                    onClick={() => hit.pinned ? unpinMemory(hit.id) : pinMemory(hit.id)}
                  >
                    {hit.pinned ? "Unpin" : "Pin"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
