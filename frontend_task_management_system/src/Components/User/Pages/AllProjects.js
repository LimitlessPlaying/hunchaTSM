import UserNavbar from "../Layout/userNavbar";
import UserFooter from "../Layout/userFooter";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";


const AllProjects = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/getProjectData')
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setTasks(data.tasks);
        } else {
          setError(new Error(data.message || "Failed to fetch project data"));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  }, []);

  //
  return (
    <div>
      <UserNavbar />

      <div className="pb-32">
      {deletedMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">
            {deletedMessage}
          </div>
      )}
        <div>
          <div>
            <div className="p-4 flex justify-end">
              <NavLink to="/addProjects" ><button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-8 py-2.5 text-center">ADD NEW PROJECT</button></NavLink>
            </div>
          </div>
        </div>
        <div>
          {tasks && (
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-12 my-4 border-4 border-indigo-800">
              <table class="text-center w-full text-sm rtl:text-right text-blue-100 dark:text-blue-100 border-separate border-spacing-1">
                <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                  <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-800">
                    <th scope="row" class="px-6 py-3 text-base font-bold">Project Name</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Deadline</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Status</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Action</th>
                  </tr>
                </thead>
                {tasks.map(task => (
                  <tbody key={task.id}>
                    <tr class="bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectName}</td>
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectDeadline}</td>
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectStatus}</td>

                      <td scope="row" class="px-6 py-1 font-medium whitespace-nowrap dark:text-blue-100">
                        <NavLink to={`/viewProjectDetails/${task.id}`}><button className=" mx-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">View Project Details</button></NavLink>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>

      <UserFooter />
    </div>
  )
}
export default AllProjects;