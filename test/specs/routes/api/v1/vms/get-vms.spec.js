import test from 'ava';
import { spy } from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { route } from '../../../../../../app/routes/api/v1/vms/get-vms';

test.beforeEach(t => {
        // Empty request
        const request = {};
        const req = mockReq(request);
        const res = mockRes();
        const next = spy();

        req.base = `${req.protocol}://${req.get('host')}`;
        req.logger = spy();

        t.context = {
                req,
                res,
                next
        };
});

test('should return no vms', async t => {
        const { req, res, next } = t.context;

        // Setup state
        req.state = {
        };

        await route(req, res, next);

        t.false(next.called);
        t.true(res.send.calledOnce);
});