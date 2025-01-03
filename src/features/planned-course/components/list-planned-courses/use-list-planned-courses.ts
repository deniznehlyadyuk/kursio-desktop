import { GetPlannedCoursesListService } from '../../services';
import { useEffect } from 'react';
import { useFetch } from '../../../../hooks';
import { useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();

  const { data: plannedCourses, reFetch } = useFetch(GetPlannedCoursesListService);

  useEffect(() => {
    if (location.state?.reFetch) {
      reFetch();
    }
  }, [location.state?.reFetch]);

  return [plannedCourses || []] as const;
};
