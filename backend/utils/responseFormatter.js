function idify(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  return { id: obj._id?.toString?.() ?? obj.id, ...obj, _id: undefined };
}

/** Course List DTO */
function toCourseListDTO(c) {
  const obj = idify(c);
  return {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    price: obj.price,
    coverImage: obj.coverImage,
    category: obj.category,
    teacherId: obj.teacherId?.toString?.() ?? obj.teacherId,
    studentsCount: obj.studentsCount ?? 0,
    courseAverageScore: obj.courseAverageScore ?? 0,
    chaptersCount: obj.chaptersCount ?? 0,
    createdAt: obj.createdAt
  };
}

/** Course Details DTO (with teacher basic + chapters) */
function toCourseDetailsDTO(course, teacher, chapters, comments) {
  const c = idify(course);
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    price: c.price,
    coverImage: c.coverImage,
    category: c.category,
    teacher: teacher
      ? {
          id: teacher._id.toString(),
          fullName: teacher.fullName,
          avatar: teacher.avatar
        }
      : null,
    studentsCount: c.studentsCount ?? 0,
    courseAverageScore: c.courseAverageScore ?? 0,
    chapters: chapters.map(ch => ({
      id: ch._id.toString(),
      title: ch.title,
      lessons: (ch.lessons || []).map(ls => ({
        id: ls._id.toString(),
        title: ls.title,
        video: ls.video,
        attachedFile: ls.attachedFile
      }))
    })),
    comments: comments.map(cm => toCommentDTO(cm)),
    createdAt: c.createdAt
  };
}

function toChapterDTO(ch) {
  const obj = idify(ch);
  return { id: obj.id, title: obj.title, courseId: obj.courseId?.toString?.() ?? obj.courseId, createdAt: obj.createdAt };
}

function toLessonDTO(ls) {
  const obj = idify(ls);
  return { id: obj.id, title: obj.title, video: obj.video, attachedFile: obj.attachedFile, chapterId: obj.chapterId?.toString?.() ?? obj.chapterId, createdAt: obj.createdAt };
}

function toCommentDTO(cm) {
  const obj = idify(cm);
  return {
    id: obj.id,
    courseId: obj.courseId?.toString?.() ?? obj.courseId,
    userId: obj.userId?.toString?.() ?? obj.userId,
    content: obj.content,
    createdAt: obj.createdAt,
    reply: obj.reply
      ? {
          content: obj.reply.content,
          repliedBy: obj.reply.repliedBy?.toString?.() ?? obj.reply.repliedBy,
          createdAt: obj.reply.createdAt
        }
      : null
  };
}

function toQuestionDTO(q) {
  const obj = idify(q);
  return {
    id: obj.id,
    lessonId: obj.lessonId?.toString?.() ?? obj.lessonId,
    userId: obj.userId?.toString?.() ?? obj.userId,
    content: obj.content,
    createdAt: obj.createdAt,
    answers: (obj.answers || []).map(a => ({
      id: a._id?.toString?.() ?? a.id,
      content: a.content,
      answeredBy: a.answeredBy?.toString?.() ?? a.answeredBy,
      createdAt: a.createdAt
    }))
  };
}

module.exports = {
  toCourseListDTO,
  toCourseDetailsDTO,
  toChapterDTO,
  toLessonDTO,
  toCommentDTO,
  toQuestionDTO
};
