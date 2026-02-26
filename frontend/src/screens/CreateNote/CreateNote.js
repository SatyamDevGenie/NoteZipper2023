import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { createNote } from "../../store/slices/notesSlice";
import { aiService } from "../../services/aiService";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function CreateNote() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [aiLoading, setAiLoading] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.notes);
  const token = useSelector((state) => state.auth.userInfo?.token);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuggestTitle = async () => {
    if (!formData.content?.trim()) {
      toast.error("Add some content first");
      return;
    }
    setAiLoading("title");
    try {
      const { title } = await aiService.suggestTitle(formData.content, token);
      setFormData((f) => ({ ...f, title }));
      toast.success("Title suggested");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to suggest title");
    } finally {
      setAiLoading(null);
    }
  };

  const handleSuggestCategory = async () => {
    if (!formData.title?.trim() && !formData.content?.trim()) {
      toast.error("Add title or content first");
      return;
    }
    setAiLoading("category");
    try {
      const { category } = await aiService.suggestCategory(
        formData.title,
        formData.content,
        token
      );
      setFormData((f) => ({ ...f, category }));
      toast.success("Category suggested");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to suggest category");
    } finally {
      setAiLoading(null);
    }
  };

  const handleImprove = async (style) => {
    if (!formData.content?.trim()) {
      toast.error("Add some content first");
      return;
    }
    setAiLoading(`improve-${style}`);
    try {
      const { content } = await aiService.improve(formData.content, style, token);
      setFormData((f) => ({ ...f, content }));
      toast.success("Content improved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to improve");
    } finally {
      setAiLoading(null);
    }
  };

  const handleExpand = async () => {
    if (!formData.content?.trim()) {
      toast.error("Add some content first");
      return;
    }
    setAiLoading("expand");
    try {
      const { continuation } = await aiService.expand(formData.content, token);
      setFormData((f) => ({ ...f, content: (f.content || "").trim() + "\n\n" + continuation }));
      toast.success("Content expanded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to expand");
    } finally {
      setAiLoading(null);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.content.trim()) {
      errors.content = "Content is required";
    }
    
    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetHandler = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
    });
    setValidationErrors({});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(createNote(formData));
      resetHandler();
      navigate("/mynotes");
    }
  };

  return (
    <div className="min-h-screen bg-theme py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-theme mb-2">Create New Note</h1>
            <p className="text-theme-muted">Capture your thoughts and ideas</p>
          </div>

          <Card className="shadow-xl">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Title */}
              <Input
                label="Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                error={validationErrors.title}
                required
              />

              {/* Category */}
              <Input
                label="Category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Work, Personal, Ideas"
                error={validationErrors.category}
                required
              />

              {/* AI Tools */}
              <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">✨</span> AI tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!token || !formData.content?.trim() || !!aiLoading}
                    onClick={handleSuggestTitle}
                  >
                    {aiLoading === "title" ? <LoadingSpinner size="sm" className="mr-1" /> : null}
                    Suggest title
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!token || (!formData.title?.trim() && !formData.content?.trim()) || !!aiLoading}
                    onClick={handleSuggestCategory}
                  >
                    {aiLoading === "category" ? <LoadingSpinner size="sm" className="mr-1" /> : null}
                    Suggest category
                  </Button>
                  <div className="inline-flex rounded-lg border border-theme bg-theme-card p-1">
                    <button
                      type="button"
                      className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50"
                      disabled={!token || !formData.content?.trim() || !!aiLoading}
                      onClick={() => handleImprove("grammar")}
                    >
                      {aiLoading === "improve-grammar" ? "..." : "Fix grammar"}
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50"
                      disabled={!token || !formData.content?.trim() || !!aiLoading}
                      onClick={() => handleImprove("formal")}
                    >
                      {aiLoading === "improve-formal" ? "..." : "Make formal"}
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50"
                      disabled={!token || !formData.content?.trim() || !!aiLoading}
                      onClick={() => handleImprove("simple")}
                    >
                      {aiLoading === "improve-simple" ? "..." : "Simplify"}
                    </button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!token || !formData.content?.trim() || !!aiLoading}
                    onClick={handleExpand}
                  >
                    {aiLoading === "expand" ? <LoadingSpinner size="sm" className="mr-1" /> : null}
                    Expand / continue
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-theme-muted">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Editor */}
                  <div className={showPreview ? "lg:block" : "col-span-2"}>
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your content here... (Markdown supported)"
                      rows={12}
                      error={validationErrors.content}
                      className="font-mono text-sm"
                    />
                  </div>

                  {/* Preview */}
                  {showPreview && (
                    <div className="lg:block">
                      <div className="border border-theme rounded-lg p-4 h-80 overflow-y-auto bg-theme-input">
                        <h4 className="text-sm font-medium text-theme-muted mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </h4>
                        {formData.content ? (
                          <ReactMarkdown className="prose prose-sm max-w-none">
                            {formData.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-theme-muted italic">Start typing to see preview...</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1 sm:flex-none"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Note
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetHandler}
                  className="flex-1 sm:flex-none"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear Form
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-theme text-center text-sm text-theme-muted">
              💡 Tip: You can use Markdown formatting for rich text content
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateNote;
