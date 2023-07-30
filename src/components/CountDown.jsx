import React, { useEffect, useState } from 'react'

export const CountDown = (props) => {

  const { duration, onTimeExpired } = props;

  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timer = setInterval(() => {
      totalSeconds--;

      if (totalSeconds <= 0) {
        clearInterval(timer);
        onTimeExpired();
      } else {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeExpired]);
  

  return (
    <div className='border border-secondary rounded-lg text-xl font-medium p-3'>
      <p>{timeLeft}</p>
    </div>
  )
}
