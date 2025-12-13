import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <button onClick={() => toast.success("Yeah boiii")}>
        Toast working?
      </button>
    </div>
  );
};

export default HomePage;
