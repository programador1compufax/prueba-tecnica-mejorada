import { dbConn } from "../db/db.js";

class AddressService {

  async getAllAddresses() {
    try {
      const addresses = await dbConn('direcciones').select().orderBy('id', 'asc');
      return addresses;

    } catch (error) {
      console.error('Error:', error);
      throw error;

    }
  }

  async getAddressById( id ) {
    try {
      const result = await dbConn('direcciones').where('id', id).limit(1);

      if( result.length === 0 ) return null;

      return result[0];

    } catch (error) {
      console.error('Error:', error);
      throw error;

    }
  }

  async getUserAddresses( id ){
    try {
      const addresses = await dbConn('direcciones').where('cliente_id', id);
      return addresses;

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateAddress( id, addressData ){
    try {
      await dbConn('direcciones').where('id', id).update( {...addressData} );

      const updatedAdress = await this.getAddressById(id); 

      return updatedAdress;

    } catch (error) {
      console.error('Error:', error);
      throw error;

    }      
  }

}
export default new AddressService();