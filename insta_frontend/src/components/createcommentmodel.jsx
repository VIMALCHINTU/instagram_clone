import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Postupperpart from "../comman/Postupperpart";
import { Auth } from "../Context/Auth";
import Commentmodel from "../comman/commentmodel";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:4000";

const customstyles = {
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
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "900px",
    height: "680px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    background: "#111",
    color: "#fff",
    padding: 0,
  },
};

const Creatcommentmodal = ({ open, setopen, post }) => {
  const { user } = useContext(Auth);
  const [text, settext] = useState("");
  const [comments, setcomments] = useState([]);

  
  useEffect(() => {
    if (!open || !post?._id || !user?.token) return;

    async function loaddata() {
      try {
        const res = await fetch(
          `${BASE_URL}/comment/getallcomments/${post._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        // IMPORTANT: ensure array
        if (Array.isArray(data)) {
          setcomments(data);
        } else if (Array.isArray(data.comments)) {
          setcomments(data.comments);
        } else {
          setcomments([]);
        }
      } catch (err) {
        console.error("Error loading comments:", err);
        setcomments([]);
      }
    }

    loaddata();
  }, [open, post?._id, user?.token,comments]);


  function handleClose() {
    setopen(false);
  }


  async function postcomment() {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `${BASE_URL}/comment/createcomment/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      if (data?.postcomment) {
        setcomments((prev) => [...prev, data.postcomment]);
      }

      settext("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  }

  return (
    <Modal
      style={customstyles}
      isOpen={open}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <div className="flex w-full h-full">
        {/* Left Side Image */}
        <div className="w-1/2 h-full">
          <img
            className="object-cover h-full w-full"
            src={post?.image_url}
            alt="post"
          />
        </div>

   
        <div className="relative w-1/2 flex flex-col">
          <div className="mt-3 overflow-y-auto flex-1 px-3 hide-scrollbar">
            <Postupperpart username={post?.author?.username} />

            <div className="mt-4 text-sm flex flex-col gap-4">
              {Array.isArray(comments) &&
                comments.map((c) => (
                  <div key={c._id}>
                    <Commentmodel
                      username={c?.author?.username}
                      caption={c?.text}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom Input */}
          <div className="absolute bottom-0 w-full flex gap-2 p-3 bg-[#111] border-t border-gray-700">
            <input
              placeholder="Add a comment"
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="bg-slate-900 flex-1 border border-dashed px-3 py-2 rounded text-white"
            />
            <button
              onClick={postcomment}
              className="px-4 bg-blue-600 rounded text-white"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Creatcommentmodal;