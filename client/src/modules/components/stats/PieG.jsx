import { Tiny } from '@ant-design/plots';
import React from 'react';

const PieG = ({correct, incorrect}) => {
  const totalQuestions = correct + incorrect; 
  const percent = (correct / totalQuestions);
  const roundedPercent = percent.toFixed(2);
  const config = {
    percent,
    width: 120,
    height: 120,
    color: ['#E8EFF5', '#66AFF4'],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${(roundedPercent * 100)/4}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return <Tiny.Ring {...config} className="m-auto flex justify-center items-center" />;
};

export default PieG