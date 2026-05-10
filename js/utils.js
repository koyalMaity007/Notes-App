export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(timestamp);
}

export function generateID() {
  return crypto.randomUUID();
}