import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import UseMenu from "../../../hooks/UseMenu";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, , refetch] = UseMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleDeleteOne = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // fetch(`http://localhost:5000/carts/${item._id}`, {
        //   method: "DELETE"
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.deletedCount > 0) {
        //       refetch();
        //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //     }
        //   });

        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          console.log("deleted res", res.data);

          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };
  return (
    <div className="w-full px-4">
      <SectionTitle
        subHeading={"---Hurry Up!---"}
        heading="MANAGE ALL ITEMS"
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {menu.map((menuItem, index) => (
              <tr key={menuItem._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={menuItem.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{menuItem.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {menuItem.category}
                  </span>
                </td>

                <td>
                  <button className="btn btn-ghost btn-xs">
                    ${menuItem.price}
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/updateItems/${menuItem._id}`}>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteOne(menuItem)}
                    className="btn btn-ghost btn-md bg-red-600 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
