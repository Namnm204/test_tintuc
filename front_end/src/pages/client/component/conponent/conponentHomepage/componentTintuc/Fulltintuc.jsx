import { Link } from "react-router-dom";

const Fulltintuc = ({ tintucs }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {tintucs.map((tintuc) => (
        <Link
          key={tintuc.id}
          to={`/tintuc/${tintuc.id}`}
          className="w-full md:w-[calc(50%-1rem)]"
        >
          <div className="flex flex-col items-center">
            <img
              src={tintuc.image || "/placeholder.jpg"}
              alt={tintuc.title}
              className="w-full h-[150px] object-cover"
            />
            <p className="p-2 h-[80px] overflow-hidden text-ellipsis line-clamp-3">
              {tintuc.id}
              {tintuc.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Fulltintuc;
