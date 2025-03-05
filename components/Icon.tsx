import React from 'react';
import { IconType } from 'react-icons';
import { IconContext } from 'react-icons';

interface Props {
  Icon: IconType;
  size?: string;
  color?: string;
  className?: string;
}

const Icon: React.FC<Props> = ({ Icon, size, color, className }) => {
  return (
    <IconContext.Provider value={{ size: size || '1em', color: color || '#000' }}>
      <Icon className={className} />
    </IconContext.Provider>
  );
};

export default Icon;
