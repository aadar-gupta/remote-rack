export default function ProfileAvatar({ firstName, lastName, size = 40, className = "" }) {
  const getInitials = () => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const getRandomColor = () => {
    const colors = [
      "#FFB3BA",
      "#BAFFC9",
      "#BAE1FF",
      "#FFFFBA",
      "#FFE4BA",
      "#E4BAFF",
    ];

    const sum = (firstName + lastName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const initials = getInitials();
  const backgroundColor = getRandomColor();
  const textColor = "#1A1A1A";

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor,
        fontSize: `${size * 0.4}px`,
        color: textColor,
        fontWeight: 600,
      }}
    >
      {initials}
    </div>
  );
}
