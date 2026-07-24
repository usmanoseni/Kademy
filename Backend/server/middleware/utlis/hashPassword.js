const bcrypt = require('bcrypt');

const hashpassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const checkPassword = async (password, hashedPassword) => {
    if (!hashedPassword) return false;
    if (typeof hashedPassword !== 'string') return false;

    if (hashedPassword.startsWith('$2')) {
        return bcrypt.compare(password, hashedPassword);
    }

    return password === hashedPassword;
}

module.exports = { hashpassword, checkPassword };