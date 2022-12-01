import { useAbi } from './contracts';

export const useRahatAbi = () => {
  const [abi, contract] = useAbi('rahat');

  return [abi, contract];
};
