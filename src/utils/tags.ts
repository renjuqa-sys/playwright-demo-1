// src/utils/tags.ts

export const TAGS = {
  // Priorities
  P1: '@p1',
  P2: '@p2',
  
  // Auth States
  AUTH: '@auth',
  GUEST: '@guest',
  
  // Scopes
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  
} as const; // "as const" makes these read-only strings