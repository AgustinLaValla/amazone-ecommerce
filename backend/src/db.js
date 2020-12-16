import { connect } from 'mongoose';
import { yellow } from 'colors';
import { config } from 'dotenv';
import { MONGODB_URL } from './config';

config();

export async function connectDB() {
    try {
        await connect(MONGODB_URL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log(`${yellow('DATABASE IS CONNECTED')}`);
    } catch (error) {
        console.log('Error Reason', error.reason);
    }
}

