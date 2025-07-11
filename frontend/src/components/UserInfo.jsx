const UserInfo = ({ user, status }) => (
  <div className="mb-2">
    <h3 className="text-lg font-semibold break-words">
      {user.name} ({user.email})
    </h3>
    <p>
      Status:{" "}
      <strong
        className={`${
          status === "approved"
            ? "text-green-600"
            : status === "declined"
            ? "text-red-600"
            : "text-orange-500"
        }`}
      >
        {status.toUpperCase()}
      </strong>
    </p>
  </div>
);

export default UserInfo;
