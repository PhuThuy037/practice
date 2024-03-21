const creatTokenUser = (user) => {
  return { name: user.username, userId: user._id, role: user.role };
};

module.exports = creatTokenUser;
