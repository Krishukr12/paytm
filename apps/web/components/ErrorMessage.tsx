export const ErrorMessage = ({ message }: { message: string }) => {
  const capitalizedMessage = message.charAt(0).toUpperCase() + message.slice(1);
  return (
    <div>
      <p className="mt-1 text-sm text-red-600">{capitalizedMessage}</p>
    </div>
  );
};
