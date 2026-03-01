import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { PiImagesThin } from "react-icons/pi";
import Postupperpart from "../comman/Postupperpart";
import { Auth } from "../Context/Auth";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:4000";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "600px",
    height: "520px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    background: "#111",
    color: "#fff",
    padding: 0,
  },
};

const Creatpostmodal = ({ open, setopen }) => {
  const { user } = useContext(Auth);

  const [caption, setcaption] = useState("");
  const [uploaded, setuploaded] = useState(null);
  const [previewurl, setpreviewurl] = useState(null);
  const [loading, setloading] = useState(false);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewurl) {
        URL.revokeObjectURL(previewurl);
      }
    };
  }, [previewurl]);

  function handlefile(e) {
    const img = e.target.files[0];
    if (!img) return;

    setuploaded(img);
    setpreviewurl(URL.createObjectURL(img));
  }

  function handleClose() {
    setopen(false);
    setcaption("");
    setuploaded(null);
    setpreviewurl(null);
  }

  async function handleupload() {
    if (!uploaded) return null;

    const formdata = new FormData();
    formdata.append("file", uploaded);

    try {
      const res = await fetch(`${BASE_URL}/post/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formdata,
      });

      if (!res.ok) throw new Error("Upload failed");

      return await res.json();
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  }

  async function onshare() {
    if (!uploaded) return;
    if (!user?.token) return;

    setloading(true);

    const uploadResponse = await handleupload();

    if (!uploadResponse?.image_url) {
      setloading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/post/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          caption: caption.trim(),
          image_url: uploadResponse.image_url,
        }),
      });

      if (!res.ok) throw new Error("Post creation failed");

      handleClose();
    } catch (err) {
      console.error("Create post error:", err);
    }

    setloading(false);
  }

  return (
    <Modal
      style={modalStyles}
      isOpen={open}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      {!uploaded ? (
        <div>
          <div className="bg-black p-3 flex items-center justify-center font-semibold">
            Create new post
          </div>

          <div className="flex flex-col gap-4 items-center justify-center h-[470px]">
            <div className="text-7xl">
              <PiImagesThin />
            </div>
            <h1 className="text-2xl">Drag photos & videos here</h1>

            <label className="bg-blue-700 p-2 rounded font-semibold cursor-pointer">
              Select from computer
              <input
                onChange={handlefile}
                className="hidden"
                type="file"
                accept="image/*"
              />
            </label>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-black relative p-3 flex items-center justify-center font-semibold">
            Create post
            <button
              disabled={loading}
              onClick={onshare}
              className="absolute right-3 text-blue-500"
            >
              {loading ? "Sharing..." : "Share"}
            </button>
          </div>

          <div className="flex h-[470px]">
            <img className="w-1/2 object-cover" src={previewurl} alt="preview" />

            <div className="w-1/2">
              <Postupperpart username={user?.username} />

              <div className="m-2">
                <textarea
                  value={caption}
                  onChange={(e) => setcaption(e.target.value)}
                  className="w-full bg-[#111] h-[170px] outline-none resize-none"
                  placeholder="Write a caption..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Creatpostmodal;