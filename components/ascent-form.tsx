"use client";

import { useState } from "react";
import { buttonClass, inputClass, labelClass } from "@/components/form-styles";
import { ASCENT_STYLES, type AscentStyle } from "@/lib/constants";
import { STYLE_LABELS } from "@/lib/format";

export default function AscentForm({ routeId }: { routeId: number }) {
  const [climberName, setClimberName] = useState("");
  const [style, setStyle] = useState<AscentStyle>("REDPOINT");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Milestone 2: POST to /api/routes/[id]/ascents, then refresh the list
    const ascent = {
      climberName: climberName.trim(),
      style,
      date,
      comment: comment.trim() || null,
    };
    setMessage(
      `Ready to send to /api/routes/${routeId}/ascents: ${JSON.stringify(ascent)}. Saving arrives with the API routes.`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-border bg-card p-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="climberName" className={labelClass}>
            Your name
          </label>
          <input
            id="climberName"
            required
            value={climberName}
            onChange={(e) => setClimberName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            suppressHydrationWarning
            className={inputClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Style</legend>
        <div className="mt-1 flex gap-4">
          {ASCENT_STYLES.map((s) => (
            <label key={s} className="flex items-center gap-1.5 text-sm">
              <input
                type="radio"
                name="style"
                value={s}
                checked={style === s}
                onChange={() => setStyle(s)}
                className="accent-accent"
              />
              {STYLE_LABELS[s]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="comment" className={labelClass}>
          Comment (optional)
        </label>
        <textarea
          id="comment"
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={inputClass}
        />
      </div>

      <button type="submit" className={buttonClass}>
        Log ascent
      </button>
      {message && (
        <p role="status" className="text-sm text-muted">
          {message}
        </p>
      )}
    </form>
  );
}
