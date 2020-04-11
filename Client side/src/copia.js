let button,
taskName,
deadlineInput,
taskInformation,
completeTaskButtons,
messageInput,
message;

if (!this.state.showButton && this.props.user.role === "Account"){
button =
<button className="btn btn-info" onClick={this.showInput}>
Edit task
</button>;
taskName= <p className="d-inline">{this.state.task.name}</p>
} else if (this.state.showButton) {

taskName= <input name="name" type="text" onChange="changeHandler" value={this.state.task.name}/>
}



button = (
  <button className="btn btn-warning" type="submit">
    Update task
  </button>
  )
}

if (this.props.user.role === "Account" && this.state.showButton=== true) {
taskInformation = (
  <form onSubmit={this.updateTask} className="row py-2">
    {deadlineInput}
    <div className="col-2 float-right">{button}</div>





if (this.props.user._id === this.state.task.assignedUser && this.state.task.activeTask) {
completeTaskButtons = (
  <div className="row justify-content-center mb-2">
    <button
      onClick={this.showMessageInput}
      className="btn btn-danger mx-2"
    >
      Issue detected
    </button>
    <button className="btn btn-success mx-2">Task completed</button>

  </div>
);




/*
let button,
taskName,
deadlineInput,
taskInformation,
completeTaskButtons,
messageInput,
message;

if (!this.state.showButton && this.props.user.role === "Account"){
button =
<button className="btn btn-info" onClick={this.showInput}>
Edit task
</button>;
taskName= <p className="d-inline">{this.state.task.name}</p>
} else if (this.state.showButton) {
button = (
  <button className="btn btn-warning" type="submit">
    Update task
  </button>
);
taskName= <input name="name" type="text" onChange="changeHandler" value={this.state.task.name}/>
}

if (this.state.deadline && !this.state.showButton) {
deadlineInput = (
  <div className="col-5">
<label className="pr-3">Deadline:</label>
<p className="font-weight-bold d-inline">
  {this.state.task.deadline}
</p>
  </div>
);
} else if (this.props.user.role ==="Account" || this.state.showButton ){
deadlineInput = (
  <div className="col-5">
    <label htmlFor="deadline" className="pr-3 text-danger">
      Assign a deadline:
    </label>
    <input
      type="date"
      name="deadline"
      onChange={this.handleChange}
      value={this.state.deadline}
      required
    />
  </div>
);
button = (
  <button className="btn btn-warning" type="submit">
    Update task
  </button>
  )
}

if (this.props.user.role === "Account" && this.state.showButton=== true) {
taskInformation = (
  <form onSubmit={this.updateTask} className="row py-2">
    <div className="col-5">
      <label htmlFor="assignedUser" className="pr-3">
        Assigned to:
      </label>
      <select name="assignedUser"  className="pt-1 pb-2" onChange={this.handleChange}>
        <option
          value={this.state.task.assignedUser}
          className="font-weight-bold"
        >
          Currently: {this.state.assignedUserName}
        </option>

        {this.state.teamMembers.map((user) => {
          return (
            <option key={user._id} value={user._id}>
              {user.role}: {user.name}
            </option>
          );
        })}
      </select>
    </div>
    {deadlineInput}
    <div className="col-2 float-right">{button}</div>
  </form>
);
} else {
taskInformation = (
  <form onSubmit={this.updateTask} className="row py-2">
    <div className="col-5">
      <label className="pr-3">Assigned to:</label>
      <p className="font-weight-bold d-inline">
        {this.state.assignedUserName}
      </p>
    </div>

    <div className="col-5">
    {deadlineInput}
    </div>
    {button}
    {message}
  </form>
);
}

if (this.props.user._id === this.state.task.assignedUser && this.state.task.activeTask) {
completeTaskButtons = (
  <div className="row justify-content-center mb-2">
    <button
      onClick={this.showMessageInput}
      className="btn btn-danger mx-2"
    >
      Issue detected
    </button>
    <button className="btn btn-success mx-2">Task completed</button>

  </div>
);

*/