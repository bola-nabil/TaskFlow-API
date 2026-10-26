
export class HttpResponses {
    success(res, statusCode=200, data) {
        res.status(statusCode).json(data);
    }

    failed(res, statusCode=500, key, value) {
        res.status(statusCode).json({
            success: false,
            [key]: value
        });
    }
}