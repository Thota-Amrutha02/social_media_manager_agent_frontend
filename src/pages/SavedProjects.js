import { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:5000";

function ProjectCard({ project }) {
  const [src, setSrc] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [candidateList, setCandidateList] = useState([]);

  // derive fallback candidates for this project once
  function buildFallbacks(image_url) {
    if (!image_url) return [];

    // If already a data URL -> use as single candidate
    if (image_url.startsWith("data:")) {
      return [image_url];
    }

    // If absolute http(s) URL -> try it first, then backend fallback(s)
    if (image_url.startsWith("http")) {
      try {
        const parsed = new URL(image_url);
        const filename = parsed.pathname.split("/").pop();
        return [
          image_url, // primary absolute URL
          `${API_BASE}/images/${filename}`, // prefer backend (API_BASE)
          `${window.location.origin}/images/${filename}` // last resort (frontend origin)
        ];
      } catch (e) {
        // if URL parsing fails, just return the original
        return [image_url];
      }
    }

    // Otherwise assume it's a filename like img_xxx.jpg -> try backend first then frontend
    const filename = image_url.split("/").pop();
    return [
      `${API_BASE}/images/${filename}`,
      `${window.location.origin}/images/${filename}`
    ];
  }

  useEffect(() => {
    const candidates = buildFallbacks(project.image_url);
    setCandidateList(candidates);
    setSrc(candidates[0] || null);
    setAttempt(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.image_url]);

  function handleImgError() {
    const nextAttempt = attempt + 1;
    if (nextAttempt >= candidateList.length) {
      // no more fallbacks -> show placeholder
      console.warn("[SavedProjects] image failed to load, all fallbacks exhausted for", project.image_url);
      setSrc("/placeholder.png");
      setAttempt(nextAttempt);
      return;
    }
    const nextSrc = candidateList[nextAttempt];
    console.warn(`[SavedProjects] image load failed. Trying fallback #${nextAttempt}: ${nextSrc}`);
    setSrc(nextSrc);
    setAttempt(nextAttempt);
  }

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white">
      {src ? (
        <img
          src={src}
          alt="Project"
          className="w-full h-48 object-cover rounded-md mb-2"
          onError={handleImgError}
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}

      <h3 className="font-semibold text-lg whitespace-pre-line">
        {project.caption_display || "No caption"}
      </h3>
      <p className="text-sm text-gray-400 mt-1">
        Saved at: {project.timestamp}
      </p>
    </div>
  );
}

export function SavedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("http://127.0.0.1:5000/savedprojects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching saved projects:", err);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No saved projects yet.</p>
      ) : (
        projects.map((project) => {
          const key = project.publish_response?.id || project.timestamp;
          return <ProjectCard key={key} project={project} />;
        })
      )}
    </div>
  );
}
