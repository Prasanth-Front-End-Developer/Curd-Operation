import React, { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setNameError("");
    }
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    }
    if (name === "mobile") {
      setMobile(value);
      setMobileError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError("Name is required");
    }
    if (!email) {
      setEmailError("Email is required");
    }
    if (!mobile) {
      setMobileError("Mobile is required");
    }

    if (name && email && mobile) {
      if (editingIndex === -1) {
        const newUser = {
          name,
          email,
          mobile,
        };
        setUsers([...users, newUser]);
      } else {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = {
          name,
          email,
          mobile,
        };
        setUsers(updatedUsers);
        setEditingIndex(-1);
      }

      setName("");
      setEmail("");
      setMobile("");
    }
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setMobile(userToEdit.mobile);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ marginTop: "5%", marginLeft: "95%" }}
      >
        Add
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Name"
                  />
                  {nameError && (
                    <div className="error-message">{nameError}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  {emailError && (
                    <div className="error-message">{emailError}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="mobile"
                    className="form-control"
                    name="mobile"
                    value={mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile"
                  />
                  {mobileError && (
                    <div className="error-message">{mobileError}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-dark"
                  style={{ marginTop: "17px" }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={mobile}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.mobile
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <button className="btn btn-success" onClick={handleSubmit}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditingIndex(-1)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
