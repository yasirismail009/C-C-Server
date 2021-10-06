import React from 'react';
import Loader from 'react-loader-spinner';

export const LoaderLarge = () => (
  <div className="w-full flex h-full justify-center align-center">
    <Loader  type="Bars" color="#0284c7" height={70} width={70} />
  </div>
);

export const LoaderSmall = () => (
  <div className="w-full flex h-full justify-center align-centerloader">
    <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
  </div>
);

