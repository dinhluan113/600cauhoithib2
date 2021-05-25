import LessonRepository from "./lessonRepository";
import QuestionRepository from "./questionRepository";

const repositories = {
    lesson: LessonRepository,
    question: QuestionRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};