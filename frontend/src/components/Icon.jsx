/* eslint-disable react/prop-types */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBiking, faBus, faCar, faMinus, faPlus, faWalking,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

library.add(faBiking, faBus, faCar, faMinus, faPlus, faWalking);

const modeToIcon = {
  walking: 'walking',
  bicycling: 'biking',
  transit: 'bus',
  driving: 'car',
};

const Icon = ({ className, iconName }) => <FontAwesomeIcon className={className} icon={modeToIcon[iconName] ? `${modeToIcon[iconName]}` : iconName} />;

export default Icon;
