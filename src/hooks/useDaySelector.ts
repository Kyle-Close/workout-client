import { useState } from "react";

export function useDaySelector() {
  const [selectedDay, setSelectedDay] = useState(1);

  const handleDayButtonClick = (isGoBack: boolean) => {
    setSelectedDay((prevSelectedDay) =>
      isGoBack ? prevSelectedDay - 1 : prevSelectedDay + 1,
    );
  };

  return {
    selectedDay,
    setSelectedDay,
    handleDayButtonClick,
  };
}
