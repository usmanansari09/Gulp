// Helper methods to deal with presenting dates.

// Formats as 9/24/2020
export const formattedShortDate = date => {
  return new Date(date).toLocaleDateString('en-us');
};

// Formats as Sep 24, 2020
export const formattedLongDate = date => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Formats as 4:47 AM
export const formattedDateTime = (date, isLong = true) => {
  return date.toLocaleDateString('en-US', {
    month: isLong ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const minimumDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 2);
  return date;
};

export const maxDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 2);
  return date;
};

export const convert24HoursTo12Hours = time => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
};
