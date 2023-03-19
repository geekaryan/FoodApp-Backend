const Menu = require("./../modal/Menumodal");

exports.find = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({
      status: "success",
      length: menuItems.length,
      data: {
        menuItems,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    res.status(200).json({
      status: "success",
      length: menuItem.length,
      data: {
        menuItem,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(200).json({
      status: "success",
      length: menu.length,
      data: {
        menu,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        menu,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
