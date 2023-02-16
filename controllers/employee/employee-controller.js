const { ObjectId } = require("bson");
var EmployeeModal = require("../../model/employee/Employee");

exports.add_employee = async (req, res) => {
  let lastEmployee = await EmployeeModal.findOne({}, {}, { sort: { 'sequence_number' : -1 } });
  var currentsequence = 0;
  if(lastEmployee){
    currentsequence = lastEmployee.sequence_number;
  }
  const employeelins = new EmployeeModal({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    status: req.body.status,
    email: req.body.email,
    phone_number: req.body.phone_number,
    designation: req.body.designation,
    sequence_number: currentsequence + 1
  });
  try {
    const employeeData = await employeelins.save();
    outputJson = {
      code: 200,
      status: "Success",
      message: "Add Employee Successfully",
    };
    res.json(outputJson);
  } catch (error) {
    outputJson = { code: 400, status: "Faild", message: "Employee Add Faild" };
    res.json(outputJson);
  }
};

exports.editEmployeedata = async (req, res) => {
  let obj = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    status: req.body.status,
    email: req.body.email,
    phone_number: req.body.phone_number,
    designation: req.body.designation
  };
  try {
    let result = await EmployeeModal.findOneAndUpdate(
      { _id: ObjectId(req.query.id) },
      obj
    );
    outputJson = {
      code: 200,
      status: "Success",
      message: "Update Employee successfully.",
      result: result,
    };
    res.json(outputJson);
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

exports.getEmployeeWithId = async (req, res) => {
  var postData = req.body;
  let where = { _id: postData.id };
  let result = await EmployeeModal.findOne(where);
  outputJson = {
    code: 200,
    status: "Success",
    message: "Employee List successfully.",
    result: result,
  };
  res.json(outputJson);
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  let cid = ObjectId(req.body.id);
  let where = {};
  where["_id"] = cid;
  try {
    let result = await EmployeeModal.deleteOne(where);
    outputJson = {
      code: 200,
      status: "Success",
      message: "Update Employee successfully.",
      result: result,
    };
    res.json(outputJson);
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};


exports.getAllEmployee = async (req, res) => {
  let postData = req.body;
  let where = {};
  
  let AllEmployeeaggregate = [
    {
      $match: where,
    },
    { $sort: { sequence_number: 1 } },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        status: 1,
        email: 1,
        phone_number: 1,
        designation: 1,
        sequence_number:1,
        created_at: 1,
        updated_at: 1,
      },
    },
  ];
  var all_employee = await EmployeeModal.aggregate(AllEmployeeaggregate);
  try {
    outputJson = {
      code: 200,
      status: "Success",
      message: "View Employee Successfully",
      result: all_employee,
    };
    res.json(outputJson);
  } catch (error) {
    outputJson = { code: 400, status: "Faild", message: "View Employee Faild" };
    res.json(outputJson);
  }
};

