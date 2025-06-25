import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, token, authChanged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!isAuthenticated || !token) {
        setNotes([]); // Clear notes on logout
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await api.get("/notes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [isAuthenticated, authChanged, token]);

  // 🟢 Handle create note button in NotesNotFound
  const handleCreateNoteClick = () => {
    if (!isAuthenticated) {
      toast("Please login to create your first note.");
      document.getElementById("auth_modal").showModal();
      return;
    }
    navigate("/create");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !isRateLimited && !loading && (
          <NotesNotFound onCreateNoteClick={handleCreateNoteClick} />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
