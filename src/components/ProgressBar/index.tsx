import { useNProgress } from "@tanem/react-nprogress";

import Bar from "./Bar";
import Container from "./Container";

const Progress = ({ isAnimating }: { isAnimating: boolean }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
    animationDuration: 100,
    incrementDuration: 1,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

export default Progress;
