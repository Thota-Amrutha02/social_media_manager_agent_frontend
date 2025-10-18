import React, { useState, useRef, useEffect } from "react";

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null); // { post_text, display_text, image_url }
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // File for upload
  const [previewImage, setPreviewImage] = useState(null); // URL/data-url for thumbnail and modal
  const [useGenerated, setUseGenerated] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [viewImage, setViewImage] = useState(null); // full-screen modal image
  const fileRef = useRef(null);


  // add near your other useEffect hooks (top-level in component)
const headerHiddenRef = React.useRef([]);

useEffect(() => {
  // selectors to try hide header/banner (covers common cases)
  const selectors = ['header', '#header', '.header', '[role="banner"]'];

  if (viewImage) {
    // store previous visibility values then hide
    headerHiddenRef.current = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el) => {
        headerHiddenRef.current.push({ el, prev: el.style.visibility || '' });
        el.style.visibility = 'hidden';
      });
    });
  } else {
    // restore previous
    (headerHiddenRef.current || []).forEach(({ el, prev }) => {
      try { el.style.visibility = prev; } catch (e) { /* ignore */ }
    });
    headerHiddenRef.current = [];
  }

  // also restore on unmount
  return () => {
    (headerHiddenRef.current || []).forEach(({ el, prev }) => {
      try { el.style.visibility = prev; } catch (e) { /* ignore */ }
    });
    headerHiddenRef.current = [];
  };
}, [viewImage]);


  // --- Persistence: load saved topic/result on mount ---
  useEffect(() => {
    const savedResult = localStorage.getItem("captionGeneratorResult");
    const savedTopic = localStorage.getItem("captionGeneratorTopic");
    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        setResult(parsed);
        // keep previewImage in sync
        if (parsed.image_url) setPreviewImage(parsed.image_url);
        setUseGenerated(!!parsed.image_url);
      } catch (e) {
        console.warn("Failed to parse saved result", e);
      }
    }
    if (savedTopic) setTopic(savedTopic);
  }, []);

  // keep result & topic persisted
  useEffect(() => {
    if (result) localStorage.setItem("captionGeneratorResult", JSON.stringify(result));
    else localStorage.removeItem("captionGeneratorResult");
  }, [result]);

  useEffect(() => {
    if (topic) localStorage.setItem("captionGeneratorTopic", topic);
    else localStorage.removeItem("captionGeneratorTopic");
  }, [topic]);

  // ensure previewImage tracks result.image_url when result changes
  useEffect(() => {
    if (result?.image_url) {
      setPreviewImage(result.image_url);
      setUseGenerated(true);
    }
  }, [result]);

  // body scroll lock when viewing full image
  useEffect(() => {
    document.body.style.overflow = viewImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [viewImage]);

  // Esc key to close full-image modal
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && viewImage) setViewImage(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewImage]);

  // auto-hide toasts
  useEffect(() => {
    if (!toasts.length) return;
    const id = setTimeout(() => setToasts((t) => t.slice(1)), 3500);
    return () => clearTimeout(id);
  }, [toasts]);

  const pushToast = (text, type = "info") => setToasts((t) => [...t, { id: Date.now(), text, type }]);

  // --- Generate content (backend) ---
  const generateContent = async () => {
    if (!topic.trim()) return pushToast("Please enter a post idea first", "warn");
    setLoading(true);
    setResult(null);
    setPreviewImage(null);
    setSelectedFile(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data.success === false) {
        pushToast("Backend error: " + (data.error || "unknown"), "error");
      } else {
        const newResult = {
          post_text: data.post_text || data.caption_hashtags || "",
          display_text: data.display_text || "",
          image_url: data.image_url || ""
        };
        setResult(newResult);
        setPreviewImage(newResult.image_url || "");
        setUseGenerated(!!newResult.image_url);
        setSelectedFile(null);
        pushToast("Generated — review below", "success");
      }
    } catch (err) {
      console.error(err);
      pushToast("Failed to connect to backend. Is Flask running?", "error");
    } finally {
      setLoading(false);
    }
  };

  const openPicker = () => {
    if (!result) return pushToast("Generate content first", "warn");
    setSelectedFile(null);
    setUseGenerated(!!previewImage);
    setPickerOpen(true);
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setUseGenerated(false);
      setPreviewImage(URL.createObjectURL(file));
      pushToast("File selected", "info");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setUseGenerated(false);
      setPreviewImage(URL.createObjectURL(file));
      pushToast("File selected", "info");
    }
  };

  const handlePost = async () => {
    if (!result) return pushToast("Nothing to post", "warn");
    setPosting(true);
    const caption = result.post_text || "";

    try {
      let res, data;
      if (selectedFile instanceof File) {
        const fd = new FormData();
        fd.append("image", selectedFile);
        fd.append("caption", caption);
        res = await fetch("http://127.0.0.1:5000/post", { method: "POST", body: fd });
        data = await res.json();
      } else if (useGenerated && previewImage) {
        res = await fetch("http://127.0.0.1:5000/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: previewImage, caption }),
        });
        data = await res.json();
      } else {
        pushToast("Please select an image or enable generated image", "warn");
        setPosting(false);
        return;
      }

      if (data?.success) {
        pushToast("Posted to Instagram successfully!", "success");
        setPickerOpen(false);
        // keep generated result (user wanted persistence). If you want to clear after post, uncomment below:
        // setResult(null); setPreviewImage(null); localStorage.removeItem("captionGeneratorResult");
      } else {
        pushToast("Post failed: " + (data?.error || "unknown"), "error");
      }
    } catch (err) {
      console.error(err);
      pushToast("Failed to post. Check backend & network.", "error");
    } finally {
      setPosting(false);
    }
  };

  const copyToClipboard = async (text) => {
    try { await navigator.clipboard.writeText(text); pushToast("Copied to clipboard", "success"); }
    catch { pushToast("Copy failed", "error"); }
  };

  const clearEverything = () => {
    setTopic('');
    setResult(null);
    setPreviewImage(null);
    setSelectedFile(null);
    localStorage.removeItem("captionGeneratorResult");
    localStorage.removeItem("captionGeneratorTopic");
    pushToast('Cleared', 'info');
  };

  // Instagram gradient class
  const igGradient = "bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-yellow-50 p-6">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-5 mb-6">
            <div className={`w-24 h-24 rounded-xl flex items-center justify-center text-5xl font-bold shadow-md ${igGradient}`}>
              IG
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                Caption & Hashtag Studio
              </h1>
              <p className="text-lg text-slate-600 mt-2">Generate captions, hashtags & images — then post to Instagram.</p>
            </div>
          </div>

          {/* Input + Buttons */}
          <div>
            <label className="text-lg font-medium text-slate-700">Post idea</label>
            <textarea value={topic} onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Sunset at Tirupati, Weekend cafe vibes..."
              className="mt-3 w-full rounded-2xl border border-slate-200 p-5 h-36 resize-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 text-lg" />
            <div className="mt-4 flex gap-4">
              <button onClick={generateContent} disabled={loading} className={`px-5 py-3 rounded-xl font-semibold ${loading ? 'opacity-70' : igGradient}`}>
                {loading ? "Generating..." : "Generate"}
              </button>
              <button onClick={openPicker} disabled={!result} className={`px-5 py-3 rounded-xl text-lg font-semibold border border-[#f58529] ${result ? 'text-[#f58529]' : 'opacity-60 cursor-not-allowed'}`}>
                Post
              </button>
              <button onClick={clearEverything} className="px-4 py-3 rounded-xl border text-slate-600">Clear</button>
            </div>
          </div>

          {/* Caption & Image Preview */}
          <div className="rounded-2xl p-5 border border-slate-100 bg-gradient-to-b from-white to-slate-50 mt-6">
            {!result ? (
              <div className="text-lg text-slate-400">No content yet — generate to see caption, hashtags & image preview.</div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-slate-800">Caption & Hashtags</h3>
                  <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(result.post_text)} className="text-sm px-3 py-2 rounded-md border">Copy</button>
                  </div>
                </div>
                <pre className="mt-3 text-lg whitespace-pre-wrap text-slate-700 bg-white p-4 rounded-md border max-h-40 overflow-auto">
                  {result.post_text}
                </pre>

                {previewImage && (
                  <div className="mt-4">
                    <h4 className="text-sm text-slate-600 mb-2">Generated image (click to view)</h4>
                    <img src={previewImage} alt="Generated preview" loading="lazy"
                      className="w-full h-52 object-cover rounded-lg cursor-pointer hover:scale-105 transition transform"
                      onClick={() => setViewImage(previewImage)} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Toasts */}
        <div className="fixed bottom-6 right-6 space-y-2 z-50">
          {toasts.map((t) => (
            <div key={t.id} className={`px-4 py-2 rounded-md shadow-lg text-base ${t.type === 'success' ? 'bg-emerald-500 text-white' : t.type === 'error' ? 'bg-rose-500 text-white' : t.type === 'warn' ? 'bg-amber-400 text-black' : 'bg-slate-800 text-white'}`}>
              {t.text}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Picker Modal ---------- */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPickerOpen(false)} />
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Post — choose image</h3>
              <button onClick={() => setPickerOpen(false)} className="text-slate-600 px-3 py-1 rounded-md border">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: options */}
              <div>
                <label className="block text-sm font-medium mb-2">Image source</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                    <input type="radio" checked={useGenerated} onChange={() => { setUseGenerated(true); setSelectedFile(null); if (result?.image_url) setPreviewImage(result.image_url); }} />
                    <div>
                      <div className="font-semibold">Use generated image</div>
                      <div className="text-sm text-slate-500">Post the image generated by the assistant.</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                    <input type="radio" checked={!useGenerated} onChange={() => { setUseGenerated(false); if (fileRef.current) fileRef.current.click(); }} />
                    <div>
                      <div className="font-semibold">Upload or choose file</div>
                      <div className="text-sm text-slate-500">Upload an image from your device or drag & drop below.</div>
                    </div>
                  </label>

                  {/* Hidden file input */}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

                  <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="mt-4 p-4 border-dashed border-2 rounded-lg text-center text-sm text-slate-500">
                    Drag & drop an image here, or <button onClick={() => fileRef.current && fileRef.current.click()} className="text-[#f58529] font-semibold">browse</button>
                    {selectedFile && <div className="mt-3 text-sm text-slate-600">Selected: {selectedFile.name}</div>}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button onClick={handlePost} disabled={posting} className={`px-4 py-2 rounded-lg font-semibold ${posting ? 'opacity-60' : igGradient}`}>
                      {posting ? "Posting..." : "Post to Instagram"}
                    </button>
                    <button onClick={() => { setSelectedFile(null); if (result?.image_url) { setPreviewImage(result.image_url); setUseGenerated(true); } pushToast("Selection cleared", "info"); }} className="px-4 py-2 rounded-lg border">
                      Clear Selection
                    </button>
                    <button onClick={() => setPickerOpen(false)} className="px-4 py-2 rounded-lg border text-slate-600">Cancel</button>
                  </div>
                </div>
              </div>

              {/* Right: preview */}
              <div>
                <label className="block text-sm font-medium mb-2">Preview</label>
                <div className="p-3 border rounded-lg bg-gray-50 min-h-[220px] flex flex-col">
                  {previewImage ? (
                    <>
                      <img src={previewImage} alt="preview" className="w-full h-56 object-cover rounded-md mb-3 cursor-pointer" onClick={() => setViewImage(previewImage)} />
                      <div className="text-sm text-slate-700 mb-2">{useGenerated ? "Using generated image" : (selectedFile ? selectedFile.name : "Selected file")}</div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">No image selected</div>
                  )}

                  <div className="mt-auto text-sm text-slate-600">
                    <div className="font-medium">Caption preview</div>
                    <div className="mt-1 whitespace-pre-wrap text-slate-700">{result?.post_text}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Fullscreen Image Modal ---------- */}
{viewImage && (
  <div
    // inline styles to force the overlay above everything
    style={{ position: 'fixed', inset: 0, zIndex: 2147483647 }}
    aria-hidden={false}
  >
    {/* dim background */}
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)' }}
      onClick={() => setViewImage(null)}
    />
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ maxWidth: '96vw', maxHeight: '96vh', width: 'auto' }}>
        <img src={viewImage} alt="Full view" style={{ width: '100%', height: 'auto', maxHeight: '96vh', objectFit: 'contain', borderRadius: 6 }} />
        <button
          onClick={() => setViewImage(null)}
          style={{ position: 'absolute', right: 22, top: 18, background: 'rgba(255,255,255,0.95)', padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd' }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
