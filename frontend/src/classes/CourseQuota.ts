export interface CourseQuota {
  course_name: string,
  course_description: string,
  term_year: string,
  course_number: string,
  course_type: string,
  course_enrollment_num: number,
  TA_quota: number,
  is_need_fix: Boolean,
  instructor_office_hour: string,
  lecture_hours: string,
  course_instructors: string,
}

export const emptyCourseQuota: CourseQuota = {
  course_name: "",
  course_description: "",
  term_year: "",
  course_number: "",
  course_type: "",
  course_enrollment_num: 0,
  TA_quota: 0,
  is_need_fix: undefined,
  instructor_office_hour: "",
  lecture_hours: "",
  course_instructors: ""
}