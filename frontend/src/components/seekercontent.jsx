import Navbar from "./navbar";
import Filters from "./filters";

const SeekerContent = () => {
    return (
        <div>
            <Navbar />
            <Filters />
            <div>
                <img src={null} alt="example" />
                <div>
                    <h3>Title</h3>
                    <p>Price</p>
                    <button>More details</button>
                </div>
            </div>
        </div>
    );
};

export default SeekerContent;
