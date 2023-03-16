const Menu = require("./../modal/Menumodal");

exports.find = async (req, res) => {
  try {
    const menuItem = await Menu.find();
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
