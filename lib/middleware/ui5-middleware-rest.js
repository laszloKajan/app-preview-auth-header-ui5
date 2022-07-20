const log = require("@ui5/logger").getLogger("server:custommiddleware:rest")
/**
 * Custom UI5 Server middleware example
 *
 * @param {object} parameters Parameters
 * @param {object} parameters.resources Resource collections
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.all Reader or Collection to read resources of the
 *                                        root project and its dependencies
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.rootProject Reader or Collection to read resources of
 *                                        the project the server is started in
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.dependencies Reader or Collection to read resources of
 *                                        the projects dependencies
 * @param {object} parameters.middlewareUtil Specification version dependent interface to a
 *                                        [MiddlewareUtil]{@link module:@ui5/server.middleware.MiddlewareUtil} instance
 * @param {object} parameters.options Options
 * @param {string} [parameters.options.configuration] Custom server middleware configuration if given in ui5.yaml
 * @returns {function} Middleware function to use
 */
module.exports = function ({ resources, middlewareUtil, options }) {
    // Example: https://sap.github.io/ui5-tooling/pages/extensibility/CustomServerMiddleware/#example-libmiddlewaremarkdownhandlerjs
    const confOpts = options && options.configuration ? options.configuration : {};
    log.info(`ui5-middleware-rest was loaded`);

    return function (req, res, next) {

        if (/^\/my-custom-endpoint/.test(req.path)) {
            if (confOpts.debug) { log.info(`serving my-custom-endpoint` +
                (req.headers.authorization ? ` with authorization header '${req.headers.authorization}'` : ' without authorization header')); }
            res.json({
                "content_Without_AuthHeader": "Response to request without 'Authorization' header.",
                "content_With_AuthHeader": "Response to request with 'Authorization' header.",
                "authorizationHeaderReceived": req.headers.authorization // If unset, this won't be part of the JSON response.s
            });
        } else {
            next();
        }
    }
};