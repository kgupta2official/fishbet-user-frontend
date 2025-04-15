import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getGamePlay } from '@/services/getRequests';
import { useStateContext } from '@/store';
const useGamePlay = () => {
  const [gamePlayData, setGamePlayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameTypeSelected, setIsGameTypeSelected] = useState(false);
  const [isDemo, setIsDemo] = useState(true);
  const [isError, setIsError] = useState(false);
  const { gameId } = useParams();
  const {
    state: { selectedCoin },
  } = useStateContext();

  const handleIsDemo = (type) => {
    setIsDemo(type);
    setIsGameTypeSelected(true);
  };

  const fetchGamePlay = async () => {
    try {
      setIsLoading(true);
      const payload = {
        gameId,
        coinType: selectedCoin === 'gold' ? 'GC' : 'SC',
        isDemo: isDemo,
      };
      const response = await getGamePlay(payload);
      setGamePlayData(response?.data);
    } catch (error) {
      setIsError(true);
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!gameId) return;

    fetchGamePlay();
  }, [gameId, isDemo, selectedCoin]);

  return {
    gamePlayData,
    isLoading,
    isError,
    isGameTypeSelected,
    handleIsDemo,
    isDemo,
  };
};

export default useGamePlay;
