import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import UseMenu from "../../../hooks/UseMenu";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = UseMenu();
  const popularItem = menu.filter((item) => item.category === "popular");

  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItem = data.filter((item) => item.category === "popular");
  //       setMenu(popularItem);
  //     });
  // }, []);

  return (
    <section className="mb-12">
      <SectionTitle
        subHeading={"---Check it out---"}
        heading={"FROM OUR MENU"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {popularItem.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>

      <div className="text-center my-4">
        <button className="btn btn-outline">View Full Menu</button>
      </div>

      <div className="footer footer-center p-20 mt-10  bg-black text-white font-semibold">
        <div>
          <p className="text-6xl"> Call Us: 01794741331</p>
        </div>
      </div>
    </section>
  );
};

export default PopularMenu;
