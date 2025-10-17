import { dbConn } from "../db/db.js";

class ClientService {

    async getAllClients() {
        try {
            const result = await dbConn.select().from('clientes').orderBy('id', 'asc');
            const clientIds = result.map( client => client.id );
            const clientAddresses = await dbConn('direcciones').whereIn('cliente_id', clientIds);

            const addressesMap = new Map();
            clientAddresses.forEach( address => {
                const clientId = address.cliente_id;
                if(!addressesMap.has(clientId)){
                    addressesMap.set(clientId, []);
                }
                addressesMap.get( clientId ).push( address );
            } );

            const clients = result.map( client => {
                client.direcciones = addressesMap.get(client.id) || [];
                return client;
            });
            
            return clients;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getClientById( id ){
        try {
            const [result] = await dbConn('clientes').where({id}).select();

            if( !result ) return null;

            return result;

        } catch (error) {
            console.error('Error:', error);
            throw error;

        }      
    }

    async createClient( clientData ){
        try {
            const [newCliente] = await dbConn('clientes').insert({
                ...clientData,
                fecha_registro : new Date()                
            }).returning('id');

            return { id: newCliente };

        } catch (error) {
            console.error('Error:', error);
            throw error;

        }
    }

}
export default new ClientService();