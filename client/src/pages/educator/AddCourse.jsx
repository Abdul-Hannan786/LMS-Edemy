import { assets } from "@/assets/assets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const { getToken } = useAppContext();

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name: ");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action == "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return toast.error("Thumbnail not provided");
      }
      if (loading) return null;
      setLoading(true);
      true;
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };
      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post("/api/educator/add-course", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-4xl w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-gray-700 lg:shadow-xl p-0 lg:p-10 rounded-xl"
      >
        <div className="space-y-2">
          <Label>Course Title</Label>
          <Input
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter the course title"
          />
        </div>

        <div className="space-y-2">
          <Label>Course Description</Label>
          <div ref={editorRef} className="border rounded-md p-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Course Price</Label>
            <Input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <div className="flex items-center gap-3">
              <label htmlFor="thumbnail">
                <img
                  src={assets.file_upload_icon}
                  alt="upload"
                  className="p-2 bg-blue-500 rounded cursor-pointer"
                />
              </label>
              <input
                type="file"
                id="thumbnail"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="h-10 rounded"
                  alt="thumb"
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Discount (%)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {chapters.map((chapter, chapIndex) => (
            <Card
              key={chapIndex}
              className="shadow-lg py-0 border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Chapter Header */}
              <div className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center bg-gray-50 px-5 py-4 border-b">
                <h3 className="font-semibold text-lg text-gray-800">
                  Chapter {chapIndex + 1}: {chapter.chapterTitle}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                  >
                    {chapter.collapsed ? "Expand" : "Collapse"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleChapter("remove", chapter.chapterId)}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {/* Chapter Content */}
              {!chapter.collapsed && (
                <CardContent className="p-5 space-y-4 bg-white">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition"
                    >
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">
                          {lectureIndex + 1}. {lecture.lectureTitle}
                        </span>{" "}
                        – {lecture.lectureDuration} mins –
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline ml-1"
                        >
                          Link
                        </a>
                        {lecture.isPreviewFree && (
                          <span className="ml-2 text-green-600 font-semibold text-xs bg-green-100 px-2 py-0.5 rounded-full">
                            Free Preview
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                      >
                        <img
                          src={assets.cross_icon}
                          alt="delete"
                          className="w-4 h-4 opacity-70 hover:opacity-100"
                        />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="secondary"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                    className="w-full cursor-pointer"
                    type="button"
                  >
                    + Add Lecture
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}

          <Button
            className="bg-blue-100 text-black hover:bg-blue-100/90 cursor-pointer"
            onClick={() => handleChapter("add")}
            type="button"
          >
            + Add Chapter
          </Button>

          <Dialog open={showPopup} onOpenChange={setShowPopup}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a Lecture</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <div className="space-y-1">
                  <Label>Lecture Title</Label>
                  <Input
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>Lecture URL</Label>
                  <Input
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="scale-125 accent-blue-500"
                  />
                  <Label>Is Preview Free?</Label>
                </div>

                <Button
                  className="w-full bg-blue-600 cursor-pointer hover:bg-blue-600/90"
                  onClick={addLecture}
                >
                  Add Lecture
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 font-semibold hover:bg-blue-600/90 cursor-pointer"
        >
          {loading ? (
            <>
              Adding Course
              <LoaderCircle
                className="w-5 h-5 animate-spin text-white"
                strokeWidth={3}
              />
            </>
          ) : (
            "Add Course"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddCourse;
