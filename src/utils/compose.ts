// A simple helper to stack traits without the "Pyramid of Doom"
export const compose = (baseClass: any, ...traits: any[]) => {
  return traits.reduce((prev, trait) => trait(prev), baseClass);
};
