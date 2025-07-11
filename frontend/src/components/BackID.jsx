const optimizeImage = (url) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", "/upload/w_600,q_auto,f_auto/")
    : url;

const BackID = ({ src, onError, error }) =>
  error ? (
    <div className="w-full max-w-xs h-48 border bg-gray-100 flex items-center justify-center">
      <p>Image failed to load</p>
    </div>
  ) : (
    <>
      <img
        src={optimizeImage(src)}
        alt="Front ID"
        onError={onError}
        loading="lazy"
        className="w-full max-w-xs h-auto border object-contain"
      />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        Download Front ID
      </a>
    </>
  );

export default BackID;
