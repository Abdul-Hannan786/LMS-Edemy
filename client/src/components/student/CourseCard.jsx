import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Star } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const CourseCard = ({ course }) => {
  const { calculateRating } = useAppContext();

  return (
    <Link to={`/course/${course._id}`}>
      <Card className="overflow-hidden shadow-xl rounded-md py-0 gap-0 border-none hover:scale-105 transition-all duration-500">
        <CardHeader className="p-0 m-0">
          <div className="aspect-video bg-muted w-full border-b">
            <img
              src={course.courseThumbnail}
              alt="course thumbnail"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        </CardHeader>

        <CardContent className="pt-3 pb-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
              Course
            </Badge>
          </div>

          <h3 className="mt-4 text-start text-[1.35rem] font-semibold tracking-tight">
            {course.courseTitle}
          </h3>

          <p className="mt-1 text-start text-muted-foreground">
            {course.educator.name || "Abdul Hannan"}
          </p>

          {/* Rating + Price Section */}
          <div className="mt-1 flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <p className="font-medium">{calculateRating(course)}</p>
              <div className="flex gap-[2px] text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(calculateRating(course))
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "stroke-gray-400"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-xs ml-1">
                ({course.courseRatings.length})
              </p>
            </div>

            {/* Price */}
            <p className="text-base font-semibold text-gray-900">
              $
              {(
                course.coursePrice -
                (course.discount * course.coursePrice) / 100
              ).toFixed(2)}
            </p>
          </div>

          <Button className="mt-6 shadow-none bg-blue-600 w-full hover:bg-blue-600/90">
            View Details <ChevronRight />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;

//  <Link
//       to={`/course/${course._id}`}
//       onClick={() => scrollTo(0, 0)}
//       className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
//     >
//       <img className="w-full" src={course.courseThumbnail} alt="course thumbnail" />
//       <div className="p-3 text-left">
//         <h3 className="text-base font-semibold">{course.courseTitle}</h3>
//         <p className="text-gray-500">{course.educator.name}</p>
//         <div className="flex items-center space-x-2">
//           <p>4.5</p>
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <img className="w-3.5 h-3.5" src={assets.star} key={i} alt="star icon" />
//             ))}
//           </div>
//           <p className="text-gray-500">22</p>
//         </div>
//         <p className="text-base font-semibold text-gray-800">
//           $
//           {(
//             course.coursePrice -
//             (course.discount * course.coursePrice) / 100
//           ).toFixed(2)}
//         </p>
//       </div>
//     </Link>
