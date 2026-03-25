import { useEffect } from "react";

function upsertStructuredData(id, payload) {
  let script = document.head.querySelector(`script[data-structured-data="${id}"]`);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-structured-data", id);
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);

  return script;
}

export default function StructuredData({ id, data }) {
  useEffect(() => {
    if (!id || !data) return undefined;

    const script = upsertStructuredData(id, data);
    return () => {
      script?.remove();
    };
  }, [data, id]);

  return null;
}
