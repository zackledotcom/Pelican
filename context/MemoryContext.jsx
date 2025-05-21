import React, { createContext, useState, useContext } from "react";
import { queryQdrant, pinQdrant, unpinQdrant } from "../hooks/vectorAPI";

// 1. Create and export the context
export const MemoryContext = createContext(null);

// 2. Create a custom hook for easier consumption
export function useMemory() {
  const context = useContext(MemoryContext);
  if (context === null) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
}

// 3. Create and export the provider component
export function MemoryProvider({ children }) {
  const [memoryHits, setMemoryHits] = useState([]);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [maxTokens, setMaxTokens] = useState(2048);
  
  const pinMemory = async (id) => {
    try {
      await pinQdrant(id);
      setMemoryHits(prev => 
        prev.map(hit => hit.id === id ? { ...hit, pinned: true } : hit)
      );
    } catch (error) {
      console.error("Error pinning memory:", error);
    }
  };
  
  const unpinMemory = async (id) => {
    try {
      await unpinQdrant(id);
      setMemoryHits(prev => 
        prev.map(hit => hit.id === id ? { ...hit, pinned: false } : hit)
      );
    } catch (error) {
      console.error("Error unpinning memory:", error);
    }
  };
  
  const fetchMemoryHits = async (query) => {
    try {
      const hits = await queryQdrant(query);
      setMemoryHits(hits);
      
      // Calculate token usage
      const totalTokens = hits.reduce((sum, hit) => sum + (hit.tokenCount || 0), 0);
      setTokenUsage(totalTokens);
    } catch (error) {
      console.error("Error fetching memory hits:", error);
    }
  };
  
  // Context value object with all state and methods
  const value = {
    memoryHits,
    tokenUsage,
    maxTokens,
    pinMemory,
    unpinMemory,
    fetchMemoryHits,
    setMaxTokens
  };
  
  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
}