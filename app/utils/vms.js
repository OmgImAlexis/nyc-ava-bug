import pathExists from 'path-exists';

let client;

// eslint-disable-next-line import/no-mutable-exports
export const hypervisor = async () => {
    // Return client if it's already connected
    if (client) {
        return client;
    }

    try {
        // Check if libvirt service is running and then connect
        const running = await pathExists('/var/run/libvirt/libvirtd.pid');

        if (!running) {
            throw new Error('Libvirt service not running');
        }

        // Libvirt is an optional dependancy
        // eslint-disable-next-line import/no-unresolved
        const { Hypervisor } = require('libvirt');
        client = new Hypervisor('qemu:///system');

        await client.connectAsync();

        console.debug('Libvirt connected');
    } catch (error) {
        console.debug(error);
    }

    return client;
};