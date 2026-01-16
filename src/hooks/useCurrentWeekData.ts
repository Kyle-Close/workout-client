import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PROGRAM_ID, USER_ID } from "../globals";
import {
  CurrentWeekSchema,
  type CurrentWeek,
} from "../schemas/currentWeekSchema";
import { useEffect, useState, type FormEvent } from "react";
import type { ExerciseLogFormItem } from "../components/WeeklyView";

export function useCurrentWeekData() {
  const [formData, setFormData] = useState<ExerciseLogFormItem[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ["currentWeekData"],
    queryFn: () => fetchCurrentWeekData(),
  });

  const handleDayButtonClick = (isGoBack: boolean) => {
    setSelectedDay((prevSelectedDay) =>
      isGoBack ? prevSelectedDay - 1 : prevSelectedDay + 1,
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/complete-day`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (!res.ok) throw new Error('Error sending form data')
  }

  useEffect(() => {
    if (data) setSelectedDay(data.currentDayOfWeek);
  }, [data]);

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  return { isPending, error, data, handleDayButtonClick, selectedDay, formData, setFormData, handleSubmit };
}

async function fetchCurrentWeekData(): Promise<CurrentWeek> {
  const res = await fetch(
    `${BASE_URL}/get-current-week-data?user_id=${USER_ID}&workout_program_id=${PROGRAM_ID}`,
  );
  if (!res.ok) throw new Error("Failed to fetch current week data!");
  const json = await res.json();
  return CurrentWeekSchema.parse(json);
}
