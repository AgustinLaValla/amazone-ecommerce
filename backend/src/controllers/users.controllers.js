import User from '../models/user.model'
import { getToken, throwErrorMessage } from '../helpers/util.helper';


export const createAdmin = async (req, res) => {
    try {
        const user = new User({
            name: 'Agustín La Valla',
            email: 'agulavalla@gmail.com',
            password: 'newkeyword10',
            isAdmin: true
        });

        await user.save();

        return res.json({ ok: true, message: 'User successfully created', user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
}

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const exists = await User.findOne({ email });
        if (exists) return res.status(421).json({ ok: false, message: 'User already exists' });

        const user = await User.create({ name, email, password });

        return res.json({ ok: true, user: { name, email, isAdmin: user.isAdmin, _id: user._id }, token: await getToken(user) })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: 'Internal server Error' });
    }
};

export const signin = async (req, res) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(421).json({ ok: false, message: 'User not found' });

        const isValid = await user.comparePassoword(password);
        if(!isValid) return res.status(404).json({ok: false, message: 'User or password is wrong'});

        return res.json({ ok: true, user, token: await getToken(user) });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }

}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
        return res.json({ ok: true, user });
    } catch (error) {
        return throwErrorMessage(error, res);
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ ok: false, message: 'User Not Found' });

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ ok: false, message: 'Passwords do not match' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });

        user.name = req.body.name;
        user.password = req.body.password

        await user.save();

        return res.json({
            ok: true,
            message: 'User successfully updated',
            user: updatedUser,
            token: await getToken(updatedUser),
            message: 'Profile successfully updated'
        })
    } catch (error) {
        return throwErrorMessage(error, res);
    }
}