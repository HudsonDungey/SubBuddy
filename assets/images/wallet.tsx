import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

export const Wallet: React.FC<{ width?: number; height?: number }> = ({ width = 37, height = 36 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 37 36" fill="none">
      <Rect x="2.25" y="7.75" width="32.5" height="26" rx="5" stroke="#AAEDFF" strokeWidth="3" />
      <Path
        d="M29.875 8.5625V7.38428C29.875 4.21752 26.9684 1.84841 23.8667 2.487L6.24174 6.11567C3.91769 6.59415 2.25 8.64017 2.25 11.013L2.25 19.125"
        stroke="#AAEDFF"
        strokeWidth="3"
      />
      <Path
        d="M8.75 26.4375H18.5"
        stroke="#AAEDFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.375 20.6875C23.375 18.4784 25.1659 16.6875 27.375 16.6875H34.75V24.8125H27.375C25.1659 24.8125 23.375 23.0216 23.375 20.8125V20.6875Z"
        stroke="#AAEDFF"
        strokeWidth="3"
      />
      <Path d="M27.4375 20.75H27.7625" stroke="#AAEDFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};
