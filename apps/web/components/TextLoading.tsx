const TextLoading = () => {
  return (
    <span className="loading-text inline-flex items-center space-x-1">
      <span className="flex space-x-1">
        <span className="animate-bounce delay-0">.</span>
        <span className="animate-bounce delay-100">.</span>
        <span className="animate-bounce delay-200">.</span>
      </span>
    </span>
  );
};

export default TextLoading;
