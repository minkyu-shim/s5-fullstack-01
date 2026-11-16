"use client";

import { useState } from "react";
import { buttonClass, inputClass, labelClass } from "@/components/form-styles";
import { GRADES, ROUTE_COLORS } from "@/lib/constants";

type Props = {
  gymSlug: string;
  walls: string[];
};

export default function NewRouteForm({ gymSlug, walls }: Props) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("6a");
  const [color, setColor] = useState(ROUTE_COLORS[0]);
  const [wall, setWall] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Milestone 2: POST to /api/gyms/[slug]/routes, then go to the new route
    const route = { name: name.trim(), grade, color, wall: wall.trim() };
    setMessage(
      `Ready to send to /api/gyms/${gymSlug}/routes: ${JSON.stringify(route)}. Saving arrives with the API routes.`,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="grade" className={labelClass}>
            Grade
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={inputClass}
          >
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="color" className={labelClass}>
            Colour
          </label>
          <select
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={`${inputClass} capitalize`}
          >
            {ROUTE_COLORS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="wall" className={labelClass}>
          Wall
        </label>
        <input
          id="wall"
          required
          list="walls"
          value={wall}
          onChange={(e) => setWall(e.target.value)}
          className={inputClass}
        />
        <datalist id="walls">
          {walls.map((w) => (
            <option key={w} value={w} />
          ))}
        </datalist>
      </div>

      <button type="submit" className={buttonClass}>
        Add route
      </button>
      {message && (
        <p role="status" className="text-sm text-muted">
          {message}
        </p>
      )}
    </form>
  );
}
