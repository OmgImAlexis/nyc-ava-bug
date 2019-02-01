import { Router } from 'express';
import { hypervisor } from '@utils';

export const route = async (req, res, next) => {
    try {
        const client = await hypervisor();
        const domains = await client.listDefinedDomainsAsync();

        res.send({
            domains
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Returns all vms.
 *
 * @name GetVars
 * @route {GET} /v1/vms
 */
export default new Router({ mergeParams: true })
    .get('/v1/vms', route);