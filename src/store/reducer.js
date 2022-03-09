const reducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload,
      };
    case 'setName':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    case 'setUserList':
      return {
        ...state,
        users: action.payload,
      };
    case 'addNewUser':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'setClasses':
      return {
        ...state,
        classes: action.payload,
      };
    case 'addClass':
      if (action.payload.classType === 'academic')
        return {
          ...state,
          classes: {
            ...state.classes,
            academic: [...state.classes.academic, action.payload],
          },
        };
      else
        return {
          ...state,
          classes: {
            ...state.classes,
            [action.payload.classType]: action.payload,
          },
        };
    case 'setSubject':
      return {
        ...state,
        subjects: {
          ...(state.subjects || {}),
          [action.payload.classCode]: action.payload.subjectsArr,
        },
      };
    case 'addSubject':
      return {
        ...state,
        subjects: {
          ...(state.subjects || {}),
          [action.payload.classCode]: [
            ...state.subjects[action.payload.classCode],
            action.payload,
          ],
        },
      };
    case 'setLessons':
      return {
        ...state,
        lessons: {
          ...(state.lessons || {}),
          [action.payload.subjectCode]: action.payload.lessonsArr,
        },
      };
    case 'addLesson':
      return {
        ...state,
        lessons: {
          ...(state.lessons || {}),
          [action.payload.subjectCode]: [
            ...(state.lessons[action.payload.subjectCode] || []),
            action.payload.newLesson,
          ],
        },
      };
    case 'deleteLessons':
      return {
        ...state,
        lessons: {
          ...(state.lessons || {}),
          [action.payload.subjectCode]: state.lessons[
            action.payload.subjectCode
          ].filter((l) => l.videoId !== action.payload.id),
        },
      };

    default:
      return state;
  }
};

export default reducer;
