import { ProgressCircle } from '@tremor/react';

const ProgressCircleHero = () => (
  <div className="mx-auto grid grid-cols-1 gap-12">
    <div className="flex justify-center">
      <ProgressCircle value={72} size="lg" />
    </div>
  </div>
);

export default ProgressCircleHero