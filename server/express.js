import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import devBundle from './devBundle';
import path from 'path';

/*
 * React Modules:
*   Will assist in rendering react components
*/
import React from 'react';
import ReactDOMServer from 'react-dom/server';

/*
 * a stateless router that takes the requested URL to match the 
 * frontend route and the MainRouter component (The root component)
 */
import { StaticRouter } from 'react-router-dom';
import MainRouter from './../client/MainRouter';

/* 
 * Material-UI modules:
  * Will help generate the CSS styles for the frontend components
*/
import { JssProvider, SheetsRegistry } from 'react-jss';
import { createMuiTheme, createGenerateClassName, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.get('/ping', (req, res) => {
    res.status("200").send("Hello World");
})


app.get('*', (req, res) => {
    // 1. Prepare Material-UI styles
    const sheetsRegistry = new SheetsRegistry();
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757de8',
                main: '#3f51b5',
                dark: '#002984',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff79b0',
                main: '#ff4081',
                dark: '#c60055',
                contrastText: '#000',
            },
            openTitle: indigo['400'],
            protectedTitle: pink['400'],
            type: 'light'
        },
    })
    const generateClassName = createGenerateClassName();
   

    // 2. Generate markup with renderToString
    /*
     * The client app's root component (MainRouter) is wrapped with the Material-UI theme
     * and JSS to provide the styling props needed by the (MainRouter) child components
     * 
     * The stateless (StaticRouter) is used instead of the (BrowserRouter) used on the client side
     * in order to wrap (MainRouter) and provide the routing props used in implementing the client side components
     * */
    const context = {};
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <MainRouter/>
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    )
    // 3. Return template with markup and CSS styles in the response
    /*
     * ONce the markup is generated, we check if there was a redirect rendered in the component to be sent in the markup.
     * If there was no redirect, then we generate the CSS string from the sheetsRegistry, and send the template back with the markup and CSS
     */
    if (context.url) {
        return res.redirect(303, context.url);
    }
   
    const css = sheetsRegistry.toString();
    res.send(Template({
        markup: markup,
        css:css
    }))
    // res.status(200).send("Hello")
})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message});
    }
})
export default app;