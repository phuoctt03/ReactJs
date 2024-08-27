export const formatViews = (watched) => {
    if (watched >= 1000000000) {
      return (watched / 1000000000).toFixed(1) + ' T'; 
    }
    if (watched >= 1000000) {
      return (watched / 1000000).toFixed(1) + ' Tr'; 
    }
    if (watched >= 1000) {
      return (watched / 1000).toFixed(1) + ' N'; 
    }
    return watched.toString();
};
  
export const timeAgo = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    const diffMilliseconds = currentDate - inputDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = currentDate.getMonth() - inputDate.getMonth() + (12 * (currentDate.getFullYear() - inputDate.getFullYear()));
    const diffYears = currentDate.getFullYear() - inputDate.getFullYear();

    const remainingMonths = diffMonths % 12;
    const remainingWeeks = diffWeeks % 4;
    const remainingDays = diffDays % 7;
    const remainingHours = diffHours % 24;
    const remainingMinutes = diffMinutes % 60;
    const remainingSeconds = diffSeconds % 60;

    if (diffYears > 0) {
      return `${diffYears} năm ${remainingMonths} tháng ${remainingWeeks} tuần trước`;
    }
    if (diffMonths > 0) {
      return `${diffMonths} tháng ${remainingWeeks} tuần ${remainingDays} ngày trước`;
    } 
    if (diffWeeks > 0) {
      return `${diffWeeks} tuần ${remainingDays} ngày ${remainingHours} giờ trước`;
    } 
    if (diffDays > 0) {
      return `${diffDays} ngày ${remainingHours} giờ ${remainingMinutes} phút trước`;
    } 
    if (diffHours > 0) {
      return `${diffHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây trước`;
    } 
    if (diffMinutes > 0) {
      return `${diffMinutes} phút ${remainingSeconds} giây trước`;
    } 
    return `${diffSeconds} giây trước`;
};