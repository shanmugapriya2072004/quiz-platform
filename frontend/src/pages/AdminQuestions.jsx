import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import api from "../services/api";

const emptyForm = {
  _id: null,
  categoryId: "",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  difficulty: "easy",
};

const AdminQuestions = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    Promise.all([api.get("/categories"), api.get("/questions")])
      .then(([catRes, qRes]) => {
        setCategories(catRes.data);
        setQuestions(qRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await api.post("/categories", { name: newCategory.trim() });
      toast.success("Category added");
      setNewCategory("");
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category and all its questions?")) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success("Category deleted");
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  const handleOptionChange = (idx, value) => {
    const opts = [...form.options];
    opts[idx] = value;
    setForm({ ...form, options: opts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.options.some((o) => !o.trim())) {
      toast.error("All four options are required");
      return;
    }
    if (!form.options.includes(form.correctAnswer)) {
      toast.error("Correct answer must match one of the options exactly");
      return;
    }
    try {
      if (form._id) {
        await api.put(`/questions/${form._id}`, form);
        toast.success("Question updated");
      } else {
        await api.post("/questions", form);
        toast.success("Question added");
      }
      setForm(emptyForm);
      setShowForm(false);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save question");
    }
  };

  const handleEdit = (q) => {
    setForm({
      _id: q._id,
      categoryId: q.categoryId?._id || q.categoryId,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await api.delete(`/questions/${id}`);
      toast.success("Question deleted");
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete question");
    }
  };

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header-row">
        <h1 className="page-title">Manage Questions</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setForm(emptyForm);
            setShowForm(!showForm);
          }}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Question"}
        </button>
      </div>

      <div className="category-manager">
        <h3>Categories</h3>
        <div className="category-add-row">
          <input
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="btn btn-outline" onClick={handleAddCategory}>
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="category-chip-list">
          {categories.map((c) => (
            <span className="category-chip" key={c._id}>
              {c.name}
              <Trash2 size={14} onClick={() => handleDeleteCategory(c._id)} />
            </span>
          ))}
        </div>
      </div>

      {showForm && (
        <form className="question-form" onSubmit={handleSubmit}>
          <label>Category</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Question</label>
          <textarea
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />

          <label>Options (4 required)</label>
          {form.options.map((opt, idx) => (
            <input
              key={idx}
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              required
            />
          ))}

          <label>Correct Answer (must match one option exactly)</label>
          <input
            value={form.correctAnswer}
            onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
            required
          />

          <label>Difficulty</label>
          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button className="btn btn-primary btn-block" type="submit">
            {form._id ? "Update Question" : "Save Question"}
          </button>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id}>
                <td>{q.question}</td>
                <td>{q.categoryId?.name || "-"}</td>
                <td>
                  <span className={`badge badge-${q.difficulty}`}>{q.difficulty}</span>
                </td>
                <td className="admin-actions">
                  <Pencil size={16} onClick={() => handleEdit(q)} />
                  <Trash2 size={16} onClick={() => handleDelete(q._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuestions;
