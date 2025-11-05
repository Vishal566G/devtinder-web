const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoURL } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm overflow-hidden">
      <figure className="h-60 w-full overflow-hidden bg-base-200">
        <img
          src={photoURL}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p className="line-clamp-3">{about}</p>
        <div className="card-actions justify-between my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
