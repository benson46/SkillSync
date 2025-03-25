import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDb from './src/config/dbConfig.js';
import corsConfig from './src/config/corsConfig.js';
import {appConfig} from './src/config/appConfig.js';
import errorHandler from './src/middleware/errorHandlerMiddleware.js';


// Routers
import authRouter from './src/module/auth/authRoute.js';
import courseRouter from './src/module/course/courseRoute.js'
import studentRouter from './src/module/student/studentRoute.js'  
const {port} = appConfig.app

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(corsConfig);


app.use('/api/auth', authRouter )
app.use('/api/course', courseRouter)
app.use('/api/student', studentRouter)

app.use(errorHandler)
console.log('here')


app.listen(port, async () => {
  try {
    await connectMongoDb();
    process.stdout.write(`Server is running on port ${port}\n`);
  } catch (error) {
    process.stderr.write(`Failed to start server: ${error.message}\n`);
    process.exit(1);
  }
});
