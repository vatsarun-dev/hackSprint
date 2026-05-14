export const createId = (prefix) => `${prefix}-${Date.now()}`;

export const splitCommaValues = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const estimateReadTime = (content) => {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
};

export const getExcerpt = (content, fallback = "") => {
  const cleaned = (content || fallback || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.length > 140 ? `${cleaned.slice(0, 137)}...` : cleaned;
};

export const fileToDataUrl = (file) =>
  new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });



