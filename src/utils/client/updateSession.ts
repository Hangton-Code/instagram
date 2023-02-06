"use client";

function updateSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}

export default updateSession;
