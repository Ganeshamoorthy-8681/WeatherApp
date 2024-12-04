export class TimeUtil {

  static convertTo12Hour(time24: string): string {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.toString().split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12; // Use 12 for 0 or 12

    // Format the time
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  static getDateString(date: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateObj = new Date(date * 1000);
    return `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
  }
}
