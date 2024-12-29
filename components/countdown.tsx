"use client"

import React, { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const Countdown = () => {
  const targetDate = new Date(2025, 1, 22, 13, 0, 0); // 22/02/2025 às 13:00
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeRemaining = () => {
    const now = new Date();
    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now) % 24;
    const minutes = differenceInMinutes(targetDate, now) % 60;
    const seconds = differenceInSeconds(targetDate, now) % 60;

    setTimeRemaining({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
      <p className="text-[#755955] text-sm">
        Será realizado em {timeRemaining.days} dias, {timeRemaining.hours} horas,{' '}
        {timeRemaining.minutes} minutos e {timeRemaining.seconds} segundos.
      </p>
  );
};

export default Countdown;
