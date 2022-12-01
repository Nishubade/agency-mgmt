import { useAbi } from './useAbi';

export const useRahatAbi = () => {
  const [abi, contract] = useAbi('rahat');

  return [abi, contract];
};
